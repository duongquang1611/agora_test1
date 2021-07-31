import { Themes } from 'assets/themes';
import React from 'react';
import { Animated, View, ViewStyle, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale, ScaledSheet } from 'react-native-size-matters';

interface Props {
    isOn: boolean;
    customStyle?: StyleProp<ViewStyle>;
    onPress?: any;
    setOn?(isTest: boolean): void;
}
const StyledSwitch = (props: Props) => {
    const { isOn, customStyle, onPress, setOn } = props;
    const AnimatedTochable = Animated.createAnimatedComponent(TouchableOpacity);
    const animateSwitchOff = new Animated.Value(0);
    const animateSwitchOn = new Animated.Value(23);
    const onSwitch = () => {
        Animated.timing(animateSwitchOff, {
            toValue: scale(25),
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setOn?.(true);
            onPress(true);
        });
    };
    const offSwitch = () => {
        Animated.timing(animateSwitchOn, {
            toValue: -scale(25),
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setOn?.(false);
            onPress(false);
        });
    };
    return (
        <View
            style={[
                {
                    backgroundColor: isOn ? Themes.COLORS.switchOn : Themes.COLORS.switchOff,
                },
                styles.container,
                customStyle,
            ]}
        >
            <AnimatedTochable
                onPress={isOn ? offSwitch : onSwitch}
                style={[styles.round, { transform: [{ translateX: isOn ? animateSwitchOn : animateSwitchOff }] }]}
            />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        height: '30@s',
        width: '55@s',
        borderRadius: '20@s',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    round: {
        height: '25@s',
        width: '25@s',
        borderRadius: '25@s',
        backgroundColor: Themes.COLORS.white,
    },
});

export default StyledSwitch;
