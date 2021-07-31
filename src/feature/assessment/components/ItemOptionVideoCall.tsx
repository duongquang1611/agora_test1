import { Themes } from 'assets/themes';
import { StyledIcon, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface OptionCallProps {
    customStyle?: StyleProp<ViewStyle>;
    icon: any;
    onPress(): void;
    status?: boolean;
    sizeIcon?: number;
}
const ItemOptionVideoCall = (props: OptionCallProps) => {
    const { icon, onPress, customStyle, status = false, sizeIcon = 30 } = props;
    return (
        <StyledTouchable onPress={onPress} customStyle={[styles.containerOption, customStyle]}>
            <StyledIcon source={icon} size={sizeIcon} />
            {status && <View style={styles.lineStyle} />}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    containerOption: {
        height: '60@s',
        width: '60@s',
        borderRadius: 50,
        backgroundColor: Themes.COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineStyle: {
        position: 'absolute',
        height: '80%',
        width: 2,
        backgroundColor: Themes.COLORS.white,
        transform: [
            {
                rotate: '35deg',
            },
        ],
    },
});

export default ItemOptionVideoCall;
