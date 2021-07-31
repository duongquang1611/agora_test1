import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import { IDENTIFY_ROUTE, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate, reset } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemFeatureApp from './components/ItemFeatureApp';

const IntroAppScreen: React.FunctionComponent = () => {
    const { APP_DISPLAY_NAME } = staticValue;
    const onPressHaveInviteCode = () => {
        reset(IDENTIFY_ROUTE.INVITE_CODE);
    };
    const pressWithoutCode = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, { url: staticValue.LANDING_PAGE });
    };
    return (
        <View style={styles.container}>
            <StyledHeader
                title={`${APP_DISPLAY_NAME.toUpperCase()}`}
                hasBack={false}
                customContainer={styles.headerContainer}
                hasBorderBottom={false}
                customTitleStyle={styles.customTitleHeader}
                customTitleContainer={styles.customTitleContainer}
            />
            <StyledText i18nText={`featureApp.title`} customStyle={styles.textTitle} />
            <ItemFeatureApp
                title="tutorial.textList.exit.title"
                value="tutorial.textList.exit.value"
                icon={Images.icons.intro.step04.exit}
            />
            <ItemFeatureApp
                title="tutorial.textList.payment.title"
                value="tutorial.textList.payment.value"
                icon={Images.icons.intro.step04.payment}
            />
            <ItemFeatureApp
                title="tutorial.textList.warning.title"
                value="tutorial.textList.warning.value"
                icon={Images.icons.intro.step04.warning}
            />
            <StyledButton
                title="tutorial.textList.inviteCode"
                onPress={onPressHaveInviteCode}
                customStyle={styles.btnInviteCode}
            />
            <View style={styles.center}>
                <StyledTouchable onPress={pressWithoutCode} customStyle={styles.containerBtnNotHaveCode}>
                    <StyledText customStyle={styles.textNoHaveCode} i18nText={'tutorial.textList.notHaveInviteCode'} />
                </StyledTouchable>
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
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
        textAlign: 'center',
        marginTop: '12@vs',
    },
    btnInviteCode: {
        marginTop: '60@vs',
    },
    containerBtnNotHaveCode: {
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.primary,
    },
    textTitle: {
        fontSize: '20@ms',
        lineHeight: '33@vs',
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: '30@vs',
    },
    textNoHaveCode: {
        color: Themes.COLORS.primary,
        fontSize: '12@ms',
        fontWeight: '300',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30@vs',
    },
    customTitleContainer: {
        justifyContent: 'center',
    },
});
export default IntroAppScreen;
