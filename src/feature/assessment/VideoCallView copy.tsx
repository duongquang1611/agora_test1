/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
import { closeTransaction } from 'api/assessment';
import { getStatusTransaction } from 'api/home';
import { updateStatusOffer } from 'api/offer';
import { updateBlacklist } from 'app-redux/blacklist/actions';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledInput, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import ModalSuccess from 'components/ModalSuccess';
import { EventSocket, NAVIGATE_TYPE, staticValue, STATUS_OFFER, VIDEO_CALL } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { useKeyboardStatus } from 'hooks/useKeyboardStatus';
import useTakePhoto from 'hooks/useTakePhoto';
import { debounce } from 'lodash';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, HISTORY_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRemoteState, VideoRenderMode } from 'react-native-agora';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Config from 'react-native-config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { formatOffer } from 'utilities/convert';
import { countJoinFunction, isIos, logger } from 'utilities/helper';
import { socket, useSocket } from 'utilities/SocketProvider';
import appInfo from '../../../app.json';
import FeatureVideoCall from './components/FeatureVideoCall';
import ItemMessageWithName from './components/ItemMessageWithName';
import ItemTyping from './components/ItemTyping';
import ListMessage from './components/ListMessage';
import ModalAgreeOffer from './components/ModalAgreeOffer';
import ModalLeaveRoom from './components/ModalLeaveRoom';
import ModalOfferView from './components/ModalOfferView';
import ModalTutorialShip from './components/ModalTutorialShip';
import OptionVideoCall from './components/OptionVideoCall';

interface AgoraState {
    token: string;
    channelName: string;
    uid: number;
    peerIds: number[];
    joinSucceed: boolean;
}
// const agoraAppId = Config.AGORA_APP_ID;
let countAcceptOffer = 0;
let isAcceptOffer = false;
let engine = new RtcEngine();
let isClose = false;
let isShowOffer = false;
let prevLocalCam = true;

const VideoCalLView = ({ route }: any) => {
    const modal = useModal(false);
    const { showModalPhoto, imageProduct } = useTakePhoto(() => toggleLocalVideo(true));
    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState(true);
    const [optionsCall, setOptionsCall] = useState<any>({
        muteAllRemoteAudio: false,
        muteLocalAudio: false,
        enableLocalVideo: true,
        adminMuteVideo: false,
        remoteFullView: true,
    });
    const {
        dataTransaction = {},
        agoraData = {
            agoraAppId: staticValue.AGORA_APP_ID,
        },
    } = route?.params || {};
    const { conversationId = '', transactionId = '' } = dataTransaction;
    const {
        onSend,
        messages,
        leaveRoom,
        setImage,
        dataClose,
        setDataClose,
        setOfferPending,
        offerPending,
        startTyping,
        endTyping,
        isAdminTyping,
    } = useSocket(conversationId.toString(), transactionId);
    const refListMessage = useRef<any>(null);
    const [valueMessage, setValueMessage] = useState<string>('');
    const { isOpenKeyboard } = useKeyboardStatus();
    const inputRef = useRef<TextInput>(null);
    const { userInfo, blacklist } = useSelector((state: any) => state);
    const { focusScreen = '' } = blacklist;
    const { REJECT, AGREE } = STATUS_OFFER;
    const [inputHeight, setInputHeight] = useState(45);
    const [agoraState, setAgoraState] = useState<AgoraState>({
        token: '',
        channelName: '',
        uid: 0,
        peerIds: [],
        ...agoraData,
    });
    const { token, channelName, peerIds } = agoraState;
    const [modeRemote, setModeRemote] = useState(VideoRenderMode.Hidden);
    const [modeLocal, setModeLocal] = useState(VideoRenderMode.Hidden);
    const { muteAllRemoteAudio, muteLocalAudio, enableLocalVideo, remoteFullView, adminMuteVideo } = optionsCall;
    const [joinSucceed, setJoinSucceed] = useState(false);
    useEffect(() => {
        if (imageProduct?.whole?.URL) {
            toggleLocalVideo(true);
            setImage(imageProduct?.whole);
        }
    }, [imageProduct?.whole]);

    useEffect(() => {
        !showMessage && setShowMessage(true);
    }, [messages]);

    const initAgora = async () => {
        engine = await RtcEngine.create(Config.AGORA_APP_ID);
        await engine.enableVideo();
        await engine.enableLocalAudio(!muteLocalAudio);
        engine.addListener('UserMuteVideo', onUserMuteVideo);
        // engine.addListener('RemoteVideoStateChanged', onRemoteVideoStateChanged);
    };

    const unMountVideo = () => {
        modal.dismiss();
        leaveRoom();
        clearTransaction();
        endCall();
        engine.destroy();
        socket.off(EventSocket.CLOSE_TRANSACTION);
        socket.off(EventSocket.OFFERS);
    };

    useEffect(() => {
        !isIos && AndroidKeyboardAdjust.setAdjustResize();
        modal.dismiss();
        initAgora().then(() => {
            startCall();
        });
        socket.off(EventSocket.OFFERS);
        socket.on(EventSocket.OFFERS, (dataOffer: any) => {
            setOfferPending(dataOffer);
        });
        socket.off(EventSocket.CLOSE_TRANSACTION);
        socket.on(EventSocket.CLOSE_TRANSACTION, (dataCloseSocket: any) => {
            setDataClose(dataCloseSocket);
        });
        return () => {
            isAcceptOffer = false;
            prevLocalCam = true;
            isShowOffer = false;
            countAcceptOffer = 0;
            isClose = false;
            unMountVideo();
        };
    }, []);

    useEffect(() => {
        if (dataClose && !isClose && focusScreen === ASSESSMENT_ROUTE.VIDEO_CALL_VIEW) {
            isClose = true;
            modal.dismiss();
            modal.show({
                children: (
                    <ModalSuccess
                        title={dataClose.message || 'common.adminCompleteTransaction'}
                        onPressIcon={dismissModal}
                    />
                ),
                onBackdropPress: dismissModal,
            });
        }
    }, [dataClose, focusScreen]);

    useEffect(() => {
        if (offerPending && !isShowOffer && focusScreen === ASSESSMENT_ROUTE.VIDEO_CALL_VIEW) {
            isShowOffer = true;
            const DATA_OFFER = formatOffer(offerPending);
            Keyboard.dismiss();
            modal.dismiss();

            modal.show({
                children: (
                    <ModalOfferView
                        onPressCancel={() => updateOffer(REJECT, offerPending)}
                        onPressOk={() => updateOffer(AGREE, offerPending)}
                        data={DATA_OFFER}
                    />
                ),
            });
        }
    }, [offerPending, focusScreen]);

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

    useEffect(() => {
        valueMessage ? startTyping() : endTyping();
    }, [valueMessage]);

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

    const dismissModal = () => {
        modal.dismiss(undefined, goToConfirm);
    };

    const updateOffer = async (status: number, dataOffer: any) => {
        isShowOffer = false;
        modal.dismiss();
        const { id } = dataOffer;
        try {
            await updateStatusOffer(id, transactionId, status);
            if (status === AGREE) {
                dispatch(updateBlacklist({ dataOffer }));
                modal.show({
                    children: <ModalAgreeOffer />,
                });
                isAcceptOffer = true;
                const countAcceptOfferStorage = await countJoinFunction(staticValue.KEY_OFFER_SUCCESS);
                countAcceptOffer = Number(countAcceptOfferStorage);
                setTimeout(() => {
                    // isClose ? null : modal.dismiss();
                    // if (countAcceptOffer === staticValue.DEFAULT_VALUE && !isClose) {
                    modal.dismiss(undefined, () => {
                        modal.show({
                            children: <ModalTutorialShip modal={modal} />,
                        });
                    });
                    // }
                }, staticValue.TIME_OFF_OFFER);
            }
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };

    const handleMessage = () => {
        Keyboard.dismiss();
        setShowMessage(!showMessage);
    };

    const startCall = async () => {
        logger('start call', false, agoraState);
        await engine?.joinChannel(token, channelName, null, agoraState?.uid);
    };

    const endCall = async () => {
        logger('end');
        await engine?.leaveChannel();
        setAgoraState({ ...agoraData, peerIds: [] });
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

    const onChangeTextMessage = useCallback((text: string) => {
        setValueMessage(text);
    }, []);

    const sendMessage = useCallback(
        debounce(() => {
            if (valueMessage.trim()) {
                onSend([
                    {
                        user: { _id: userInfo.user.id },
                        text: valueMessage.trim(),
                        createdAt: new Date(),
                    },
                ]);
                setValueMessage('');
            }
        }, 200),
        [valueMessage, messages],
    );

    const renderItemMessage = ({ item }: any) => {
        return (
            <ItemMessageWithName
                item={item}
                name={item?.user?._id === staticValue.ADMIN_TYPE ? VIDEO_CALL.me : VIDEO_CALL.other}
                message={item?.text}
            />
        );
    };

    const chooseImage = debounce(async () => {
        showModalPhoto(0);
    }, 300);

    const resizeHeightInput = useCallback((height: number) => {
        if (height < verticalScale(80)) {
            setInputHeight(
                height < inputHeight
                    ? height < inputHeight / 2
                        ? inputHeight
                        : inputHeight + (isIos ? 20 : 0)
                    : height + (isIos ? 30 : 10),
            );
        }
    }, []);

    const leaveRoomVideo = () => {
        modal.show({
            children: (
                <ModalLeaveRoom
                    onCancel={() => modal.dismiss()}
                    onOk={() => {
                        confirmCloseConversation();
                    }}
                />
            ),
        });
    };

    const confirmCloseConversation = () => {
        modal.dismiss(undefined, async () => {
            try {
                const result = await closeTransaction(transactionId);
                logger('close transaction', false, result.data);
            } catch (err) {
                logger(err);
            } finally {
                goToConfirm();
            }
        });
    };

    const clearTransaction = async () => {
        try {
            const transactions = await getStatusTransaction();
            if (transactions?.data) {
                await closeTransaction(transactions.data.id);
            }
        } catch (error) {
            logger(error);
        }
    };

    const goToConfirm = async () => {
        logger('goToConfirm', false, { isAcceptOffer });
        modal.dismiss();
        if (isAcceptOffer) {
            unMountVideo();
            navigate(
                countAcceptOffer <= staticValue.DEFAULT_VALUE
                    ? ACCOUNT_ROUTE.ADDRESS
                    : ASSESSMENT_ROUTE.CONFIRM_TRANSFER,
                { navigateFrom: NAVIGATE_TYPE.VIDEO_AND_CHAT },
            );
        } else {
            navigate(HISTORY_ROUTE.ROOT);
        }
    };

    const onLayoutRemote = () => {
        modeRemote === VideoRenderMode.Hidden && setModeRemote(VideoRenderMode.Fit);
    };

    const onLayoutLocal = () => {
        setModeLocal(VideoRenderMode.Fit);
    };

    useEffect(() => {
        modeLocal === VideoRenderMode.Fit && setModeLocal(VideoRenderMode.Hidden);
    }, [modeLocal]);

    const renderVideos = () => {
        return (
            <StyledTouchable
                customStyle={[
                    styles.containerLocalVideos,
                    !remoteFullView && { backgroundColor: Themes.COLORS.jumbo32 },
                ]}
                onPress={() => {
                    remoteFullView && toggleOption('remoteFullView');
                }}
            >
                {enableLocalVideo ? (
                    <RtcLocalView.SurfaceView
                        style={styles.localVideo}
                        channelId={channelName}
                        renderMode={modeLocal}
                        zOrderMediaOverlay={remoteFullView}
                        onLayout={onLayoutLocal}
                    />
                ) : (
                    defaultVideo()
                )}
            </StyledTouchable>
        );
    };

    const renderRemoteVideos = () => {
        return (
            peerIds.length > 0 &&
            peerIds.map((value) => {
                return (
                    <StyledTouchable
                        customStyle={[
                            styles.containerRemoteVideos,
                            remoteFullView && { backgroundColor: Themes.COLORS.jumbo32 },
                        ]}
                        key={value}
                        onPress={() => {
                            !remoteFullView && toggleOption('remoteFullView');
                        }}
                    >
                        {adminMuteVideo ? (
                            defaultVideo(false)
                        ) : (
                            <RtcRemoteView.SurfaceView
                                style={styles.remote}
                                uid={value}
                                channelId={channelName}
                                renderMode={modeRemote}
                                zOrderMediaOverlay={!remoteFullView}
                                onLayout={onLayoutRemote}
                            />
                        )}
                    </StyledTouchable>
                );
            })
        );
    };

    const handleSwitchCam = () => {
        engine.switchCamera();
    };

    const handleSwitchVideo = () => {
        toggleOption('remoteFullView');
    };

    const defaultVideo = (isLocal = true) => {
        const renderText = () => (
            <StyledText
                i18nText={isLocal ? appInfo.displayName.toUpperCase() : 'videoView.adminMuteVideo'}
                customStyle={[
                    styles.textAppName,
                    isLocal && { fontWeight: 'bold' },
                    { fontSize: moderateScale(remoteFullView ? (isLocal ? 25 : 14) : !isLocal ? 10 : 25) },
                ]}
            />
        );
        return (remoteFullView && isLocal) || (!remoteFullView && !isLocal)
            ? renderText()
            : !showMessage && renderText();
    };

    const contentChangeMessage = () => {
        refListMessage?.current?.scrollToTop?.();
    };

    return (
        <>
            <View style={styles.fullView}>
                {joinSucceed && (remoteFullView ? renderRemoteVideos() : renderVideos())}
            </View>
            <View style={styles.container}>
                <View style={styles.remoteVideo}>
                    {joinSucceed ? (!remoteFullView ? renderRemoteVideos() : renderVideos()) : defaultVideo()}
                </View>
                <View style={styles.featureContainer}>
                    <FeatureVideoCall
                        {...{
                            handleSwitchVideo,
                            handleSwitchCam,
                            handleChooseImage: () => {
                                toggleLocalVideo(false);
                                chooseImage();
                            },
                            handleMessage,
                        }}
                        customStyle={styles.optionCall}
                    />
                </View>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.messageAndOption}
                    enableOnAndroid={true}
                    enableAutomaticScroll={isIos}
                    showsVerticalScrollIndicator={false}
                    extraHeight={Metrics.screenHeight}
                    alwaysBounceVertical={false}
                    onScrollBeginDrag={() => isOpenKeyboard && Keyboard.dismiss()}
                >
                    <View style={styles.containerChat}>
                        <>
                            {showMessage && (
                                <View
                                    style={[
                                        styles.messageList,
                                        {
                                            backgroundColor:
                                                messages.length > 0
                                                    ? Themes.COLORS.backgroundMessage
                                                    : Themes.COLORS.transparent,
                                        },
                                    ]}
                                >
                                    <ListMessage
                                        ref={refListMessage}
                                        data={messages}
                                        renderItem={renderItemMessage}
                                        contentChange={contentChangeMessage}
                                    />
                                    {isAdminTyping && <ItemTyping />}
                                </View>
                            )}
                            <View
                                style={[
                                    styles.containerMessage,
                                    {
                                        paddingVertical: isOpenKeyboard
                                            ? isIos
                                                ? verticalScale(5)
                                                : verticalScale(-20)
                                            : verticalScale(10),
                                    },
                                ]}
                            >
                                <StyledInput
                                    ref={inputRef}
                                    value={valueMessage}
                                    onChangeText={onChangeTextMessage}
                                    multiline={true}
                                    returnKeyType={'default'}
                                    blurOnSubmit={false}
                                    containerStyle={[
                                        styles.inputContainer,

                                        {
                                            height: verticalScale(inputHeight),
                                            paddingTop: isIos ? verticalScale(10) : 0,
                                        },
                                        !showMessage && styles.hideInput,
                                    ]}
                                    customStyle={[styles.input, !showMessage && { color: Themes.COLORS.transparent }]}
                                    customPlaceHolder={showMessage ? 'videoView.placeholder' : ''}
                                    onContentSizeChange={(e) => resizeHeightInput(e.nativeEvent.contentSize.height)}
                                />
                                {showMessage && (
                                    <StyledTouchable onPress={sendMessage} customStyle={styles.containerBtnSend}>
                                        <StyledIcon
                                            size={28}
                                            source={Images.icons.videoCall.send}
                                            customStyle={styles.iconSend}
                                        />
                                    </StyledTouchable>
                                )}
                            </View>
                        </>
                        {!isOpenKeyboard && (
                            <OptionVideoCall
                                customStyle={[
                                    {
                                        marginBottom: verticalScale(showMessage ? 28 : 80),
                                    },
                                ]}
                                {...{
                                    muteAllRemoteAudio,
                                    muteLocalAudio,
                                    enableLocalVideo,
                                    toggleOption,
                                    leaveRoomVideo,
                                }}
                            />
                        )}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
};
const styles = ScaledSheet.create({
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

    containerKeyboardAvoid: {
        flex: 1,
    },
    featureContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: '15@s',
        height: '140@vs',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: Themes.COLORS.assessment.bgInput,
        borderRadius: '22.5@vs',
        paddingLeft: '10@s',
    },
    containerMessage: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        paddingHorizontal: '20@s',
    },
    input: {
        color: Themes.COLORS.white,
        fontSize: '14@ms',
    },
    remoteVideo: {
        width: '110@s',
        height: '140@vs',
        backgroundColor: Themes.COLORS.black,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Themes.COLORS.backgroundPrimary,
        position: 'absolute',
        top: Metrics.safeTopPadding,
        left: '15@s',
        zIndex: 5,
    },
    disableVideoUser: {
        tintColor: Themes.COLORS.assessment.user,
    },
    containerBtnSend: {
        height: '50@s',
        width: '50@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionCall: {
        width: '28@s',
        height: '28@s',
    },
    iconSend: {
        marginTop: '-5@vs',
    },
    containerChat: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    messageAndOption: {
        alignItems: 'center',
        flexGrow: 1,
    },
    hideInput: {
        backgroundColor: Themes.COLORS.transparent,
        position: 'absolute',
        bottom: -Metrics.screenHeight,
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
    messageList: {
        height: isIos ? '230@vs' : '245@vs',
        justifyContent: 'flex-end',
    },
});

export default VideoCalLView;
