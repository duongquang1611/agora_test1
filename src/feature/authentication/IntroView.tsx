import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import { ScaledSheet } from 'react-native-size-matters';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { Themes } from 'assets/themes';

const IntroView = () => {
    const goToVideoCall = () => {
        navigate(AUTHENTICATE_ROUTE.VIDEO);
    };
    const goToLiveStreaming = () => {
        navigate(AUTHENTICATE_ROUTE.LIVE_STREAM);
    };
    const Button = ({ color, ...props }: any) => {
        return (
            <StyledButton
                customTitleStyle={{ fontSize: 35 }}
                customStyle={{ flex: 1, width: '100%', backgroundColor: color }}
                {...props}
            />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <Button title="Video Call" onPress={goToVideoCall} color={Themes.COLORS.primary} />
            <Button title="Live Streaming" onPress={goToLiveStreaming} color={Themes.COLORS.secondary} />
        </View>
    );
};

const styles = ScaledSheet.create({});

export default IntroView;
