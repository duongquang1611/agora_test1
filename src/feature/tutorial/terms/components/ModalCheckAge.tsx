import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ModalCheckAge = (props: any) => {
    const { onPressCancel, onPressOk } = props;
    return (
        <View style={styles.container}>
            <StyledText i18nText={'tutorial.terms.ageTitle'} customStyle={styles.title} />
            <StyledText i18nText={'tutorial.terms.ageContent'} customStyle={styles.ageContent} />
            <View style={styles.containerBtn}>
                <StyledText onPress={onPressCancel} i18nText={'tutorial.terms.no'} customStyle={styles.textBtn} />
                <View style={styles.separator} />
                <StyledText
                    onPress={onPressOk}
                    i18nText={'tutorial.terms.yes'}
                    customStyle={[styles.textBtn, styles.textBtnYes]}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '268@s',
        height: '160@vs',
        backgroundColor: Themes.COLORS.white,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 14,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: 'bold',
        marginTop: '18@vs',
        textAlign: 'center',
    },
    ageContent: {
        fontSize: '11@ms',
        lineHeight: '16.5@vs',
        fontWeight: '300',
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
        fontWeight: 'bold',
    },
    separator: {
        height: '100%',
        backgroundColor: Themes.COLORS.silver,
        width: 1,
    },
    containerBtn: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: Themes.COLORS.silver,
    },
});

export default ModalCheckAge;
