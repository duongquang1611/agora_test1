import { createStackNavigator } from '@react-navigation/stack';
import WebViewScreen from 'components/common/WebViewScreen';
import VideoCallView from 'feature/assessment/VideoCallView';
import VideoView from 'feature/authentication/VideoView';
import SendOTP from 'feature/authentication/SendOtp';
import IntroAppScreen from 'feature/tutorial/IntroAppScreen';
import InviteCodeScreen from 'feature/tutorial/inviteCode/InviteCodeScreen';
import TermsScreen from 'feature/tutorial/terms/TermsScreen';
import TutorialScreen from 'feature/tutorial/TutorialScreen';
import navigationConfigs from 'navigation/config/options';
import {
    ASSESSMENT_ROUTE,
    AUTHENTICATE_ROUTE,
    IDENTIFY_ROUTE,
    TUTORIAL_ROUTE,
    WEBVIEW_ROUTE,
} from 'navigation/config/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();

const AuthStack = () => {
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
            <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={VideoView} />
            <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
            <MainStack.Screen name={WEBVIEW_ROUTE.WEBVIEW} component={WebViewScreen} />
            <MainStack.Screen name={ASSESSMENT_ROUTE.VIDEO_CALL_VIEW} component={VideoCallView} />
        </MainStack.Navigator>
    );
};

export default AuthStack;
