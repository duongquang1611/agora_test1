import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { checkAudio, checkCamera } from 'utilities/permissions';

const ConfirmVideoCallView = ({ onClose }: any) => {
    const goToVideoCall = async () => {
        const grantedCamera = await checkCamera();
        const grantedAudio = await checkAudio();
        grantedCamera && grantedAudio && onClose();
    };
    return (
        <View style={styles.container}>
            <View style={styles.viewCall}>
                <StyledIcon source={Images.icons.assessment.iconPhone} customStyle={styles.iconPhone} size={41} />
                <StyledText customStyle={styles.textCall} i18nText={'assessment.textCall'} />
            </View>
            <StyledButton title={'assessment.confirmCall'} customStyle={styles.buttonConfirm} onPress={goToVideoCall} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: Metrics.screenWidth,
        backgroundColor: Themes.COLORS.backgroundModal,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCall: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginVertical: 37,
    },
    iconPhone: {},
    textCall: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        color: Themes.COLORS.white,
    },
    buttonConfirm: {},
});

export default ConfirmVideoCallView;
