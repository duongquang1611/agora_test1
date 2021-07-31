import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const FollowStepPurchase = () => {
    const renderDotText = (title: string) => {
        return (
            <View style={styles.dotContent}>
                <View style={styles.dot} />
                <StyledText i18nText={title} customStyle={[styles.normalText, styles.textOther]} />
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <StyledText i18nText={'videoView.need'} customStyle={[styles.title]} />
            <StyledText i18nText={'videoView.followStep'} customStyle={styles.textFollowStep} />
            {renderDotText('videoView.enterInfo')}
            {renderDotText('videoView.transfer')}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        borderRadius: 10,
        paddingHorizontal: '30@s',
        paddingTop: '45@vs',
        marginTop: 15,
    },
    title: {
        fontSize: '22@ms',
        lineHeight: '33@vs',
        fontWeight: '600',
    },
    normalText: {
        fontSize: '17@ms',
        lineHeight: '25.5@vs',
        fontWeight: '300',
    },
    textOther: {
        color: Themes.COLORS.textSecondary,
    },
    dotContent: {
        flexDirection: 'row',
        marginTop: '15@vs',
        alignItems: 'center',
    },
    dot: {
        height: '8@s',
        width: '8@s',
        backgroundColor: Themes.COLORS.primary,
        borderRadius: 20,
        marginRight: 15,
    },
    textFollowStep: {
        fontSize: '17@ms',
        lineHeight: '25.5@vs',
        fontWeight: '300',
        color: Themes.COLORS.textSecondary,
        marginTop: '17@vs',
    },
});

export default FollowStepPurchase;
