import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface HeaderIntroProps {
    step: number;
    onPressSkip(): void;
}
const HeaderIntroView: React.FunctionComponent<HeaderIntroProps> = (props: HeaderIntroProps) => {
    const { step = 0, onPressSkip } = props;
    return (
        <View style={styles.container}>
            <StyledTouchable onPress={onPressSkip} customStyle={styles.containerSkip}>
                <StyledText i18nText={'tutorial.skip'} customStyle={styles.textSkip} />
            </StyledTouchable>
            <View style={styles.containerTitle}>
                <View>
                    <StyledText i18nText={'tutorial.step'} customStyle={styles.textStep} />
                    <View style={styles.textNumStepContainer}>
                        <StyledText originValue={`${step + 1}`} customStyle={styles.textNumStep} />
                    </View>
                </View>
                <View>
                    <StyledText originValue={''} />
                    <StyledText i18nText={`tutorial.title.step${step + 1}`} customStyle={styles.textTitle} />
                </View>
            </View>
            <StyledText i18nText={`tutorial.subTitle.step${step + 1}`} customStyle={styles.textSubTitle} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: '20@s',
        paddingTop: '20@vs',
    },

    headerContainer: {
        backgroundColor: Themes.COLORS.primary,
        height: '80@vs',
    },
    customTitleHeader: {
        fontSize: '18@ms',
        lineHeight: '23.4@vs',
        fontWeight: '700',
        color: Themes.COLORS.white,
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '25@s',
    },
    textStep: {
        fontSize: '16@ms',
        lineHeight: '20.8@vs',
        fontWeight: '700',
        color: Themes.COLORS.primary,
    },
    textNumStepContainer: {
        borderRadius: 50,
        width: '28@s',
        height: '28@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '6@s',
    },
    textNumStep: {
        color: Themes.COLORS.white,
        fontWeight: '700',
    },
    textTitle: {
        fontSize: '20@ms',
        lineHeight: '33@vs',
        fontWeight: '600',
        marginLeft: '2@s',
        marginTop: '7@vs',
    },
    containerSkip: {
        alignSelf: 'flex-end',
        marginBottom: '10@vs',
    },
    textSkip: {
        fontSize: '18@ms',
        lineHeight: '21.48@vs',
        fontWeight: '400',
        color: Themes.COLORS.primary,
        textAlign: 'center',
    },
    textSubTitle: {
        fontSize: '15@ms',
        lineHeight: '22.5@vs',
        fontWeight: '300',
        color: Themes.COLORS.textSecondary,
        textAlign: 'center',
        paddingVertical: '15@vs',
    },
});
export default HeaderIntroView;
