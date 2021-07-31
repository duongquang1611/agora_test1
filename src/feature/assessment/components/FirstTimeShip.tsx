import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const FirstTimeShip = () => {
    return (
        <View style={styles.container}>
            <StyledText i18nText={'videoView.futureFlow'} customStyle={styles.title} />
            <StyledText i18nText={'videoView.firstTimeShip'} customStyle={[styles.normalText, styles.textOther]} />
            <View style={styles.arrowContent}>
                <StyledIcon size={21} source={Images.icons.videoCall.arrow} />
                <StyledText i18nText={'videoView.pleasePurchase'} customStyle={[styles.normalText, styles.textArrow]} />
            </View>
            <StyledText
                i18nText={'videoView.note'}
                customStyle={[styles.normalText, { color: Themes.COLORS.videoCallView.noteOffer }]}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        borderRadius: 10,
        marginHorizontal: '30@s',
        marginTop: '60@vs',
    },
    title: {
        fontSize: '22@ms',
        fontWeight: 'bold',
    },
    textArrow: {
        marginLeft: 10,
        color: Themes.COLORS.textSecondary,
        marginTop: 0,
    },
    normalText: {
        fontSize: '17@ms',
        marginTop: '15@vs',
        lineHeight: '24@ms',
    },
    textOther: {
        color: Themes.COLORS.textSecondary,
    },
    arrowContent: {
        flexDirection: 'row',
        marginTop: '15@vs',
        alignItems: 'center',
    },
});

export default FirstTimeShip;
