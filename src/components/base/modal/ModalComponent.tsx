import Images from 'assets/images';
import Metrics from 'assets/metrics';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon } from '..';

const ModalComponent = ({ children, onBackdropPressed, hasClose = false, onPressIconClose }: any) => {
    const startValue = new Animated.Value(Metrics.screenHeight);
    const endValue = new Animated.Value(Metrics.screenHeight * 0.3);
    const duration = 200;
    Animated.timing(startValue, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
    }).start();

    return (
        <View style={styles.contWrapper}>
            <TouchableOpacity activeOpacity={0.9} onPress={onBackdropPressed} style={styles.contBlurLayout} />
            <Animated.View
            // style={[
            //     {
            //         transform: [{ translateY: startValue }],
            //     },
            // ]}
            >
                {hasClose && (
                    <TouchableOpacity onPress={onPressIconClose} style={styles.iconClose}>
                        <StyledIcon source={Images.icons.close} size={17} />
                    </TouchableOpacity>
                )}
                {children}
            </Animated.View>
        </View>
    );
};

const styles = ScaledSheet.create({
    contWrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contBlurLayout: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    iconClose: {
        alignItems: 'flex-end',
        right: '20@s',
        marginBottom: '15@vs',
    },
});

export default ModalComponent;
