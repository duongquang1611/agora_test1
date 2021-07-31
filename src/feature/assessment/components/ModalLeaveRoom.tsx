import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ModalLeaveRoom = (props: any) => {
    const { onCancel, onOk } = props;
    return (
        <View style={styles.container}>
            <StyledText i18nText={'videoView.confirmLeave'} customStyle={styles.title} />
            <View style={styles.containerBtn}>
                <StyledText onPress={onCancel} i18nText={'videoView.cancel'} customStyle={styles.textBtn} />
                <View style={styles.separator} />
                <StyledText
                    onPress={onOk}
                    i18nText={'videoView.leaveRoom'}
                    customStyle={[styles.textBtn, styles.textBtnYes]}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '268@s',
        height: '140@vs',
        backgroundColor: Themes.COLORS.white,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 14,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '600',
        marginTop: '18@vs',
        textAlign: 'center',
    },
    textBtn: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        color: Themes.COLORS.tutorialView.textBtnAge,
        flex: 1,
        textAlign: 'center',
        padding: 10,
    },
    textBtnYes: {
        fontWeight: '600',
    },
    separator: {
        height: '100%',
        backgroundColor: Themes.COLORS.silver,
        width: 0.5,
    },
    containerBtn: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: Themes.COLORS.silver,
    },
});

export default ModalLeaveRoom;
