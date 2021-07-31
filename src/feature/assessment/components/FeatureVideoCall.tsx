import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemOptionVideoCall from './ItemOptionVideoCall';

const FeatureVideoCall = (props: any) => {
    const { handleSwitchVideo, handleSwitchCam, handleChooseImage, handleMessage, customStyle } = props;
    return (
        <View style={styles.featureContainer}>
            <ItemOptionVideoCall
                icon={Images.icons.videoCall.switch_video}
                onPress={handleSwitchVideo}
                customStyle={[styles.containerOption, customStyle]}
                sizeIcon={30}
            />
            <ItemOptionVideoCall
                icon={Images.icons.videoCall.switch}
                onPress={handleSwitchCam}
                customStyle={[styles.containerOption, customStyle]}
                sizeIcon={30}
            />

            <ItemOptionVideoCall
                icon={Images.icons.videoCall.camera}
                onPress={handleChooseImage}
                customStyle={[styles.containerOption, customStyle]}
                sizeIcon={28}
            />
            <ItemOptionVideoCall
                icon={Images.icons.videoCall.message}
                onPress={handleMessage}
                customStyle={[styles.containerOption, customStyle]}
                sizeIcon={28}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    featureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '55%',
    },
    endVideo: {
        backgroundColor: Themes.COLORS.videoCallView.endVideo,
    },
    containerOption: {
        backgroundColor: Themes.COLORS.transparent,
        justifyContent: 'flex-start',
        marginTop: '5@vs',
        shadowColor: Themes.COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
});

export default FeatureVideoCall;
