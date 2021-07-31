import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemOptionVideoCall from './ItemOptionVideoCall';

const OptionVideoCall = (props: any) => {
    const { muteAllRemoteAudio, muteLocalAudio, enableLocalVideo, toggleOption, leaveRoomVideo, customStyle } = props;
    return (
        <View style={[styles.optionVideoContainer, customStyle]}>
            <ItemOptionVideoCall
                status={!enableLocalVideo}
                icon={Images.icons.videoCall.video}
                onPress={() => toggleOption('enableLocalVideo')}
            />
            <ItemOptionVideoCall
                status={muteLocalAudio}
                icon={Images.icons.videoCall.mic}
                onPress={() => toggleOption('muteLocalAudio')}
            />
            <ItemOptionVideoCall
                status={muteAllRemoteAudio}
                icon={Images.icons.videoCall.volume}
                onPress={() => toggleOption('muteAllRemoteAudio')}
            />
            {!!leaveRoomVideo && (
                <ItemOptionVideoCall
                    icon={Images.icons.videoCall.end}
                    onPress={leaveRoomVideo}
                    customStyle={styles.endVideo}
                    sizeIcon={35}
                />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    optionVideoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '95%',
        alignSelf: 'center',
    },
    endVideo: {
        backgroundColor: Themes.COLORS.videoCallView.endVideo,
    },
});

export default memo(OptionVideoCall);
