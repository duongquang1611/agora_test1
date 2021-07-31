import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledImage, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface NotificationProps {
    onPress(): void;
}
const ModalNotificationView = (props: NotificationProps) => {
    const { onPress } = props;
    return (
        <View style={styles.container}>
            <StyledImage source={Images.photo.homeView.imgNotification} customStyle={styles.imgNotification} />
            <StyledText i18nText={'homeView.notification'} customStyle={styles.textNotification} />
            <StyledButton title={'homeView.next'} onPress={onPress} customStyle={styles.buttonNext} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: Metrics.screenWidth - 44,
        height: '473@s',
        borderRadius: 5,
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
    },
    imgNotification: {
        width: '244@s',
        height: '245@s',
        marginTop: '48@vs',
    },
    textNotification: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 22,
        marginTop: '26@vs',
        color: Themes.COLORS.assessment.titlePicture,
    },
    buttonNext: {
        marginTop: '28@vs',
    },
});

export default ModalNotificationView;
