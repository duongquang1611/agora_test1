/* eslint-disable no-underscore-dangle */
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledInput, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import FeatureVideoCall from 'feature/assessment/components/FeatureVideoCall';
import OptionVideoCall from 'feature/assessment/components/OptionVideoCall';
import { AGORA, staticValue } from 'feature/staticData';
import useTakePhoto from 'hooks/useTakePhoto';
import { debounce } from 'lodash';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, HISTORY_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, StatusBar, TextInput, View } from 'react-native';
import RtcEngine, {
    ChannelProfile,
    ClientRole,
    RtcLocalView,
    RtcRemoteView,
    VideoRemoteState,
    VideoRenderMode,
} from 'react-native-agora';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { isIos, logger } from 'utilities/helper';
import { checkAudio, checkCamera } from 'utilities/permissions';
import appInfo from '../../../app.json';

interface AgoraState {
    token: string;
    channelName: string;
    uid: number;
    peerIds: number[];
}

let engine = new RtcEngine();
let prevLocalCam = true;
const initAgoraData = {
    ...AGORA,
    peerIds: [],
};

const LiveStreamView = () => {
    const dispatch = useDispatch();
    const [optionsCall, setOptionsCall] = useState<any>({
        muteAllRemoteAudio: false,
        muteLocalAudio: false,
        enableLocalVideo: true,
        adminMuteVideo: false,
        remoteFullView: true,
    });
    const [role, setRole] = useState(ClientRole.Audience);
    const [agoraState, setAgoraState] = useState<AgoraState>(initAgoraData);
    const { token, channelName, peerIds } = agoraState;
    const { muteAllRemoteAudio, muteLocalAudio, enableLocalVideo, remoteFullView, adminMuteVideo } = optionsCall;
    const [joinSucceed, setJoinSucceed] = useState(false);
    const isClient = role === ClientRole.Audience;

    const initAgora = async () => {
        await checkCamera();
        await checkAudio();
        engine = await RtcEngine.create(Config.AGORA_APP_ID);
        await engine.enableVideo();
        await engine.enableLocalAudio(!muteLocalAudio);
        await engine.startPreview();
        // Set the channel profile as live streaming.
        await engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
        // Set the usr role as host.
        await engine.setClientRole(role);
        engine.addListener('UserMuteVideo', onUserMuteVideo);
        // engine.addListener('RemoteVideoStateChanged', onRemoteVideoStateChanged);
    };

    const unMountVideo = () => {
        endCall();
        engine.destroy();
    };

    useEffect(() => {
        initAgora();
        return () => {
            prevLocalCam = true;
            unMountVideo();
        };
    }, []);

    useEffect(() => {
        engine.addListener('Error', (err) => {
            if (err === staticValue.ERROR_START_CAM) {
                toggleLocalVideo(true);
            }
            logger('Error', false, err);
        });
        engine.addListener('JoinChannelSuccess', onJoinChannelSuccess);
        engine.addListener('UserJoined', onUserJoined);
        engine.addListener('UserOffline', onUserOffline);
        return () => {
            engine.removeAllListeners();
        };
    }, [agoraState, optionsCall]);

    const onJoinChannelSuccess = useCallback(
        (channel: string, uid: number, elapsed: any) => {
            logger('onJoinChannelSuccess', false, { uid, channel, elapsed });
            setJoinSucceed(true);
        },
        [joinSucceed],
    );
    const onUserJoined = useCallback(
        (uid: number, elapsed: any) => {
            logger('userJoined', false, { uid, agoraState, elapsed });
            if (peerIds.indexOf(uid) === -1) {
                setAgoraState({
                    ...agoraState,
                    peerIds: [...peerIds, uid],
                });
            }
        },
        [agoraState],
    );
    const onUserOffline = useCallback(
        (uid: number, reason: any) => {
            logger('userOffline', false, { uid, reason, agoraState });
            setAgoraState({
                ...agoraState,
                peerIds: peerIds.filter((id) => id !== uid),
            });
        },
        [agoraState],
    );

    const switchRole = async () => {
        const nextRole = isClient ? ClientRole.Broadcaster : ClientRole.Audience;
        setRole(nextRole);
        await engine.setClientRole(nextRole);
    };

    const onUserMuteVideo = useCallback(
        (uid: number, muted: boolean) => {
            logger('onUserMuteVideo', false, { uid, muted, optionsCall });
            setOptionsCall({
                ...optionsCall,
                adminMuteVideo: muted,
            });
        },
        [agoraState, optionsCall],
    );

    const onRemoteVideoStateChanged = useCallback(
        (uid: number, state: VideoRemoteState) => {
            logger('onRemoteVideoStateChanged', false, { uid, state });
            setOptionsCall({
                ...optionsCall,
                adminMuteVideo: state === VideoRemoteState.Stopped,
            });
        },
        [optionsCall],
    );

    const startCall = async () => {
        logger('start call', false, agoraState);
        await engine?.joinChannel(token, channelName, null, agoraState?.uid);
    };

    const endCall = async () => {
        logger('end');
        await engine?.leaveChannel();
        setAgoraState(initAgoraData);
        setJoinSucceed(false);
    };

    const toggleLocalVideo = async (valueEnableVideo?: boolean) => {
        if (prevLocalCam && valueEnableVideo !== undefined) {
            setOptionsCall({
                ...optionsCall,
                enableLocalVideo: valueEnableVideo === undefined ? !enableLocalVideo : valueEnableVideo,
            });
            await engine.enableLocalVideo(valueEnableVideo === undefined ? !enableLocalVideo : valueEnableVideo);
        }
    };

    const toggleOption = async (optionId: string) => {
        setOptionsCall({ ...optionsCall, [optionId]: !optionsCall[optionId] });
        switch (optionId) {
            case 'muteAllRemoteAudio':
                await engine.muteAllRemoteAudioStreams(!muteAllRemoteAudio);
                break;
            case 'muteLocalAudio':
                await engine.muteLocalAudioStream(!muteLocalAudio);
                break;
            case 'enableLocalVideo':
                prevLocalCam = !enableLocalVideo;
                await engine.enableLocalVideo(!enableLocalVideo);
                break;
            default:
                break;
        }
    };

    const renderVideos = () => {
        return (
            <StyledTouchable
                customStyle={[
                    styles.containerLocalVideos,
                    !remoteFullView && { backgroundColor: Themes.COLORS.jumbo32 },
                ]}

                // onPress={() => {
                //     remoteFullView && toggleOption('remoteFullView');
                // }}
            >
                {enableLocalVideo && !isClient ? (
                    <RtcLocalView.SurfaceView
                        style={styles.localVideo}
                        channelId={channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={!remoteFullView}
                    />
                ) : (
                    defaultVideo()
                )}
            </StyledTouchable>
        );
    };

    const renderRemoteVideos = () => {
        return (
            <ScrollView contentContainerStyle={styles.wrapRemote} horizontal>
                {peerIds.length > 0 &&
                    peerIds.map((value) => {
                        return (
                            <View
                                style={[
                                    styles.remoteVideo,
                                    {
                                        width: scale(110),
                                        height: verticalScale(165),
                                    },
                                ]}
                                key={value}
                            >
                                <StyledTouchable
                                    customStyle={[
                                        styles.containerRemoteVideos,
                                        remoteFullView && { backgroundColor: Themes.COLORS.jumbo32 },
                                    ]}
                                    // onPress={() => {
                                    //     !remoteFullView && toggleOption('remoteFullView');
                                    // }}
                                >
                                    {adminMuteVideo ? (
                                        defaultVideo(false)
                                    ) : (
                                        <RtcRemoteView.SurfaceView
                                            style={styles.remote}
                                            uid={value}
                                            channelId={channelName}
                                            renderMode={VideoRenderMode.Hidden}
                                            zOrderMediaOverlay={remoteFullView}
                                        />
                                    )}
                                </StyledTouchable>
                            </View>
                        );
                    })}
            </ScrollView>
        );
    };

    const handleSwitchCam = () => {
        engine.switchCamera();
    };

    const handleSwitchVideo = () => {
        toggleOption('remoteFullView');
    };

    const defaultVideo = (isLocal = true) => {
        return (
            <StyledText
                i18nText={isLocal ? 'LOCAL' : 'REMOTE'}
                customStyle={[
                    styles.textAppName,
                    isLocal && { fontWeight: 'bold' },
                    { fontSize: moderateScale(remoteFullView ? (isLocal ? 25 : 14) : !isLocal ? 10 : 25) },
                ]}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeView}>
            <StyledHeader
                title={`Live Streaming ${channelName}`}
                hasBorderBottom={false}
                customContainer={styles.headerStyle}
            />
            <View style={styles.fullView}>{joinSucceed && renderVideos()}</View>
            {joinSucceed && renderRemoteVideos()}
            <View style={styles.container}>
                {/* <View style={styles.featureContainer}>
                    <FeatureVideoCall
                        {...{
                            handleSwitchVideo,
                            handleSwitchCam,
                        }}
                        customStyle={styles.optionCall}
                    />
                </View> */}

                {joinSucceed ? (
                    <>
                        {!isClient && (
                            <OptionVideoCall
                                customStyle={styles.optionsCall}
                                {...{
                                    muteAllRemoteAudio,
                                    muteLocalAudio,
                                    enableLocalVideo,
                                    toggleOption,
                                    leaveRoomVideo: endCall,
                                }}
                            />
                        )}
                        <StyledButton
                            title={`Change role to ${isClient ? 'Broadcaster' : 'Audience'}`}
                            onPress={switchRole}
                            customStyle={styles.startCallBtn}
                        />
                    </>
                ) : (
                    <StyledButton
                        title={'Join Channel Live Stream'}
                        onPress={startCall}
                        customStyle={styles.startCallBtn}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};
const styles = ScaledSheet.create({
    wrapRemote: {
        paddingHorizontal: '15@s',
    },
    safeView: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: Metrics.safeTopPadding,
        justifyContent: 'flex-end',
    },
    fullView: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        position: 'absolute',
        backgroundColor: Themes.COLORS.jumbo32,
        zIndex: -1,
    },
    remote: {
        width: '100%',
        height: '100%',
        backgroundColor: Themes.COLORS.black,
    },
    localVideo: {
        width: '100%',
        height: '100%',
        backgroundColor: Themes.COLORS.black,
    },
    optionVideoCall: {
        position: 'absolute',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-evenly',
        bottom: 0,
        left: 0,
        right: 0,
    },
    featureContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: '15@s',
        height: '140@vs',
    },
    input: {
        color: Themes.COLORS.white,
        fontSize: '14@ms',
    },
    remoteVideo: {
        backgroundColor: Themes.COLORS.black,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Themes.COLORS.backgroundPrimary,
        marginTop: Metrics.safeTopPadding,
    },
    optionCall: {
        width: '28@s',
        height: '28@s',
    },
    textAppName: {
        flexWrap: 'wrap',
        color: Themes.COLORS.white,
        textAlign: 'center',
    },
    containerRemoteVideos: {
        width: '100%',
        height: '100%',
        backgroundColor: Themes.COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLocalVideos: {
        width: '100%',
        height: '100%',
        backgroundColor: Themes.COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsCall: {
        marginBottom: '30@vs',
    },
    startCallBtn: {
        width: '100%',
    },
    headerStyle: {
        backgroundColor: Themes.COLORS.primary,
    },
});

export default LiveStreamView;
