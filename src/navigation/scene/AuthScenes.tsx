import { createStackNavigator } from '@react-navigation/stack';
import WebViewScreen from 'components/common/WebViewScreen';
import LoginScreen from 'feature/authentication/LoginScreen';
import SendOTP from 'feature/authentication/SendOtp';
import IntroAppScreen from 'feature/tutorial/IntroAppScreen';
import InviteCodeScreen from 'feature/tutorial/inviteCode/InviteCodeScreen';
import TermsScreen from 'feature/tutorial/terms/TermsScreen';
import TutorialScreen from 'feature/tutorial/TutorialScreen';
import navigationConfigs from 'navigation/config/options';
import { AUTHENTICATE_ROUTE, IDENTIFY_ROUTE, TUTORIAL_ROUTE, WEBVIEW_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();

const AuthStack = () => {
    const { common, blacklist } = useSelector((state: any) => state);
    const { showTutorial, typeInviteCode, showTerms } = common;
    const { showIntro } = blacklist;
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
            {showTutorial && <MainStack.Screen name={TUTORIAL_ROUTE.ROOT} component={TutorialScreen} />}
            {showIntro && !showTutorial && (
                <MainStack.Screen name={TUTORIAL_ROUTE.INTRO_APP} component={IntroAppScreen} />
            )}
            {(!typeInviteCode || showIntro) && (
                <MainStack.Screen name={IDENTIFY_ROUTE.INVITE_CODE} component={InviteCodeScreen} />
            )}
            {showTerms && <MainStack.Screen name={IDENTIFY_ROUTE.TERMS} component={TermsScreen} />}
            <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
            <MainStack.Screen name={WEBVIEW_ROUTE.WEBVIEW} component={WebViewScreen} />
        </MainStack.Navigator>
    );
};

export default AuthStack;
