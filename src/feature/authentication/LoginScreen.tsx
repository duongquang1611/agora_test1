import { getVerifyCodeLogin } from 'api/modules/api-app/authenticate';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { staticValue } from 'feature/staticData';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { isIos, logger } from 'utilities/helper';
import { validatePhoneWithLength } from 'utilities/validate';

const LoginScreen: React.FunctionComponent = () => {
    const [value, setValue] = useState<string>('');
    const { common } = useSelector((state: any) => state);
    const { inviteCode, typeInviteCode } = common;
    const { LENGTH_PHONE } = staticValue;
    const onChangeText = (text: string) => {
        setValue(text);
    };
    const onPressNext = async () => {
        try {
            await getVerifyCodeLogin(value, inviteCode, typeInviteCode);
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, { phone: value });
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const isValidPhone = useMemo(() => validatePhoneWithLength(value), [value]);

    return (
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.container}>
            <SafeAreaView style={styles.body}>
                <StyledText i18nText={'identify.title'} customStyle={styles.textTitle} />
                <StyledInput
                    value={value}
                    onChangeText={onChangeText}
                    customPlaceHolder="identify.placeholderPhone"
                    keyboardType="phone-pad"
                    containerStyle={styles.customStyleInput}
                    customStyleIncludeError={styles.containerInput}
                    showClear={true}
                    errorMessage={isValidPhone ? '' : 'identify.notIdentifyPhone'}
                    maxLength={LENGTH_PHONE}
                    autoFocus={true}
                />
                <StyledButton
                    title={'identify.next'}
                    onPress={onPressNext}
                    disabled={!isValidPhone}
                    customStyle={styles.btnNext}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        marginTop: '100@vs',
        marginHorizontal: '40@s',
    },
    loginButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
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
});
export default LoginScreen;
