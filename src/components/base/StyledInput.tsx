import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledTouchable } from '.';
import StyledText from './StyledText';

interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyleIncludeError?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: string;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    errorMessage?: string;
    showClear?: boolean;
    iconLeft?: any;
    onPressIconLeft?(): void;
    customKeyboardType?: any;
    customTextError?: StyleProp<TextStyle>;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const input = React.useRef<TextInput>(null);
    const { t } = useTranslation();
    const {
        showClear = false,
        containerStyle,
        errorMessage = '',
        customPlaceHolder,
        customStyle,
        customStyleIncludeError,
        customReturnKeyType,
        placeholderTextColor,
        customUnderlineColor,
        iconLeft,
        onPressIconLeft,
        value = '',
        onChangeText,
        customTextError,
    } = props;
    const clearText = () => {
        (ref || input).current.clear();
        onChangeText?.('');
    };
    const isError = errorMessage?.length > 0 && value?.length > 0 && isFocused;
    return (
        <View style={[styles.includeError, customStyleIncludeError]}>
            <View
                style={[
                    styles.containerRowInput,
                    { borderColor: isError ? Themes.COLORS.borderInputError : Themes.COLORS.primary },
                    containerStyle,
                ]}
            >
                {iconLeft && (
                    <TouchableOpacity onPress={onPressIconLeft} style={styles.containerIconLeft}>
                        <StyledIcon customStyle={styles.iconLeft} size={20} source={iconLeft} />
                    </TouchableOpacity>
                )}
                <TextInput
                    ref={ref || input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        styles.textInput,
                        customStyle,
                        !isFocused && errorMessage ? { borderColor: Themes.COLORS.borderInputError } : {},
                    ]}
                    placeholderTextColor={placeholderTextColor || Themes.COLORS.placeHolderGray}
                    placeholder={customPlaceHolder ? t(customPlaceHolder) : ''}
                    underlineColorAndroid={customUnderlineColor || 'transparent'}
                    importantForAutofill="yes"
                    autoCorrect={false}
                    returnKeyType={customReturnKeyType || 'next'}
                    blurOnSubmit={!!customReturnKeyType}
                    selectionColor={Themes.COLORS.primary}
                    textAlignVertical={'center'}
                    {...props}
                />
                {showClear && value ? (
                    <StyledTouchable customStyle={styles.containerRight} onPress={clearText}>
                        <StyledIcon size={18} source={Images.icons.clearInput} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.containerRight} />
                )}
            </View>
            {isError && (
                <StyledText i18nText={errorMessage} customStyle={[styles.styleErrorMessage, customTextError]} />
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    textInput: {
        flex: 1,
        borderColor: Themes.COLORS.primary,
        fontSize: '20@s',
        paddingVertical: 10,
        paddingRight: 25,
        paddingLeft: 10,
        height: '100%',
    },
    containerRight: {
        right: '10@s',
    },
    containerRowInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        height: '55@vs',
        borderColor: Themes.COLORS.primary,
    },
    iconLeft: {},
    containerIconLeft: {
        width: '30@s',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        left: '5@s',
    },
    styleErrorMessage: {
        fontSize: 12,
        color: Themes.COLORS.borderInputError,
        marginTop: 20,
        marginHorizontal: 10,
    },
    includeError: {
        width: '100%',
    },
});
export default React.forwardRef(StyledInput);
