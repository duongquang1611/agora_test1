import * as React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import Metrics from 'assets/metrics';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    onPress(): void;
    onLongPress?(): void;
    disabled?: boolean;
    isOutlineButton?: boolean;
    colorText?: string;
    customTitleStyle?: StyleProp<TextStyle>;
    hitSlop?: number;
}

const StyledButton: React.FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const {
        disabled = false,
        isOutlineButton = false,
        onPress,
        customStyle,
        onLongPress,
        title,
        colorText,
        customTitleStyle,
        hitSlop,
    } = props;
    const bgColorContainer = disabled
        ? Themes.COLORS.westar
        : isOutlineButton
        ? Themes.COLORS.transparent
        : Themes.COLORS.primary;
    const textTitleColor = isOutlineButton ? Themes.COLORS.primary : Themes.COLORS.white;
    return (
        <StyledTouchable
            disabled={disabled}
            customStyle={[
                styles.container,
                {
                    backgroundColor: bgColorContainer,
                    borderWidth: disabled ? 0 : 1,
                },
                customStyle,
            ]}
            onPress={onPress}
            onLongPress={onLongPress}
            hitSlop={hitSlop}
        >
            <StyledText
                i18nText={title}
                customStyle={[styles.title, { color: colorText || textTitleColor }, customTitleStyle]}
            />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        height: 48,
        width: Metrics.screenWidth - 76,
        borderColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        alignSelf: 'center',
        paddingHorizontal: 38,
    },
    title: {
        color: Themes.COLORS.white,
        fontSize: '15@ms',
        lineHeight: 22.5,
        fontWeight: '600',
    },
});

export default StyledButton;
