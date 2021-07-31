import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface AlertProps {
    title: string;
    message: string;
    messageCancel: string;
    messageConfirm: string;
    onCancel?(): void;
    onConfirm?(): void;
    oneOption?: boolean;
}
const ShowAlertMessage = (props: AlertProps) => {
    const { title, message, messageCancel, messageConfirm, onCancel, onConfirm, oneOption = false } = props;
    return (
        <View style={styles.container}>
            <StyledText i18nText={title} customStyle={styles.title} />
            {message ? (
                <StyledText i18nText={message} customStyle={styles.message} />
            ) : (
                <View style={styles.viewNull} />
            )}
            <View style={styles.viewButton}>
                {oneOption ? (
                    <StyledText i18nText={messageConfirm} onPress={onConfirm} customStyle={styles.confirm} />
                ) : (
                    <>
                        <StyledText i18nText={messageCancel} onPress={onCancel} customStyle={styles.cancel} />
                        <View style={styles.separator} />
                        <StyledText i18nText={messageConfirm} onPress={onConfirm} customStyle={styles.confirm} />
                    </>
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        borderRadius: 11,
        backgroundColor: Themes.COLORS.white,
        width: Metrics.screenWidth - 106,
        alignItems: 'center',
    },
    title: {
        marginTop: '26@vs',
        fontSize: 14,
        fontWeight: 'bold',
        color: Themes.COLORS.black,
        textAlign: 'center',
        paddingHorizontal: '20@s',
        lineHeight: '21@vs',
    },
    message: {
        marginTop: '10@vs',
        fontSize: 11,
        marginBottom: '20@vs',
        lineHeight: '16@vs',
        paddingHorizontal: '20@s',
        textAlign: 'center',
    },
    viewButton: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Themes.COLORS.silver,
        width: Metrics.screenWidth - 106,
        height: '44@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: Themes.COLORS.homeView.no,
    },
    confirm: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: Themes.COLORS.homeView.no,
        fontWeight: 'bold',
    },
    separator: {
        height: '100%',
        width: 1,
        backgroundColor: Themes.COLORS.silver,
    },
    viewNull: {
        marginTop: 17,
    },
});

export default ShowAlertMessage;
