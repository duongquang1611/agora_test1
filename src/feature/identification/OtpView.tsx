import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { APP_ROUTE, IDENTIFY_ROUTE } from 'navigation/config/routes';
import { navigate, reset } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { isIos } from 'utilities/helper';
import { OTP, staticValue } from '../staticData';

const OtpView = () => {
    const { valid: otpValid } = OTP;
    const { resource } = useSelector((state: any) => state);
    const { province } = resource;
    const [value, setValue] = useState('');
    const { CELL_OTP } = staticValue;
    const ref = useBlurOnFulfill({ value, cellCount: CELL_OTP });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [isError, setIsError] = useState<boolean>(false);
    const onPressResend = () => {
        alert('resend');
    };
    useEffect(() => {
        if (value) {
            if (value === otpValid) {
                province?.id ? reset(APP_ROUTE.MAIN_TAB) : navigate(IDENTIFY_ROUTE.SELECT_PROVINCE);
            } else !isError && setIsError(true);
        }
    }, [value]);
    return (
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.containerKeyboardAvoid}>
            <StyledHeader title={''} hasBorderBottom={false} />
            <SafeAreaView style={styles.container}>
                <StyledText i18nText={'identify.titleOtp'} customStyle={styles.textTitle} />
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_OTP}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    caretHidden={true}
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <StyledText i18nText={'identify.resendSms'} customStyle={styles.btnResend} onPress={onPressResend} />
                {isError && <StyledText i18nText={'identify.notValidOtp'} customStyle={styles.styleErrorMessage} />}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = ScaledSheet.create({
    containerKeyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        paddingTop: '15@vs',
        paddingHorizontal: '40@s',
    },
    textTitle: {
        fontWeight: '600',
        fontSize: '20@ms',
        lineHeight: '30@vs',
    },
    customStyleInput: {
        borderBottomWidth: 0.8,
    },
    containerInput: {
        marginVertical: '25@vs',
    },
    btnNext: {
        position: 'absolute',
        bottom: isIos ? '17@vs' : '40@vs',
    },
    root: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    codeFieldRoot: {
        marginTop: '30@vs',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        width: '35@s',
        height: '45@vs',
        lineHeight: '36@vs',
        fontSize: '24@ms',
        borderWidth: 0.8,
        borderColor: Themes.COLORS.cloudy,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 3,
        margin: '10@s',
    },
    focusCell: {
        borderColor: Themes.COLORS.primary,
    },
    containerBtn: {
        height: '25@vs',
        minWidth: '20@s',
    },
    btnResend: {
        marginTop: '40@vs',
        borderWidth: 0,
        fontSize: '14@ms',
        color: Themes.COLORS.primary,
        lineHeight: '21@vs',
        fontWeight: '300',
        textAlign: 'center',
    },
    styleErrorMessage: {
        fontSize: 12,
        color: Themes.COLORS.borderInputError,
        paddingTop: 8,
        marginTop: '25@vs',
        textAlign: 'center',
    },
});

export default OtpView;
