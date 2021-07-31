import { getVerifyCodeLogin } from 'api/modules/api-app/authenticate';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/logger';

const SendOTP: React.FunctionComponent = ({ route }: any) => {
    const { phone } = route.params;
    const { common } = useSelector((state: any) => state);
    const { inviteCode, typeInviteCode } = common;
    const { loading, requestLogin } = useLogin();
    const { CELL_OTP } = staticValue;
    const [isError, setIsError] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_OTP });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        if (value.length === CELL_OTP) {
            requestLogin({ phone, code: value, setIsError });
        } else {
            isError && setIsError(false);
        }
    }, [value]);
    useEffect(() => {
        ref?.current?.focus();
    }, []);
    const resendOTP = async () => {
        try {
            await getVerifyCodeLogin(phone, inviteCode, typeInviteCode);
            AlertMessage('common.resendOtp');
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <>
            <StyledHeader hasBorderBottom={false} />
            <StyledOverlayLoading visible={loading} />
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={styles.container}>
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
                        autoFocus={true}
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    {
                                        borderColor:
                                            Themes.COLORS[
                                                isError ? 'borderInputError' : isFocused ? 'primary' : 'cloudy'
                                            ],
                                    },
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <View style={styles.underline}>
                        <StyledText
                            i18nText={'identify.resendSms'}
                            customStyle={styles.btnResend}
                            onPress={resendOTP}
                        />
                    </View>
                    {isError && <StyledText i18nText={'identify.notValidOtp'} customStyle={styles.styleErrorMessage} />}
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '40@s',
        justifyContent: 'center',
        alignContent: 'center',
    },
    resend: {
        textDecorationLine: 'underline',
        textDecorationColor: Themes.COLORS.black,
        color: Themes.COLORS.black,
        textAlign: 'right',
        width: '100%',
    },
    textTitle: {
        fontWeight: '600',
        fontSize: '19@ms',
        lineHeight: '30@vs',
        marginTop: '40@vs',
        marginBottom: '25@vs',
    },
    btnResend: {
        marginTop: '30@vs',
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
    underline: {
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.primary,
    },
    codeFieldRoot: {
        marginTop: '30@vs',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        width: '33@s',
        height: '40@vs',
        lineHeight: '36@vs',
        fontSize: '24@ms',
        borderWidth: 0.8,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 3,
        margin: '10@s',
    },
    focusCell: {
        borderColor: Themes.COLORS.primary,
    },
});
export default SendOTP;
