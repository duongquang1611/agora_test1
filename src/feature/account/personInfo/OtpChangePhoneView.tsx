import { getOtpChangePhone, verifyOtpChangePhone } from 'api/account';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { isIos, logger } from 'utilities/helper';
import { staticValue } from '../../staticData';

const OtpChangePhoneView = ({ route }: any) => {
    const [value, setValue] = React.useState('');
    const { userInfo } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const { newPhone } = route.params;
    const { CELL_OTP } = staticValue;
    const modal = useModal();
    const ref = useBlurOnFulfill({ value, cellCount: CELL_OTP });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        ref?.current?.focus();
    }, []);
    const resendOtp = async () => {
        try {
            await getOtpChangePhone(newPhone);
            AlertMessage('common.resendOtp');
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const disabledBtn = value.length !== CELL_OTP;

    const onPressWhenSuccess = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT);
        modal.dismiss();
    };
    const onPressChangePhone = async () => {
        try {
            await verifyOtpChangePhone(newPhone, value);
            dispatch(setUserInfo({ ...userInfo, user: { ...userInfo.user, phone: newPhone } }));
            modal.show({
                children: <ModalSuccess title={'changePhone.success'} onPressIcon={onPressWhenSuccess} />,
                onBackdropPress: onPressWhenSuccess,
            });
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    return (
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.containerKeyboardAvoid}>
            <StyledHeader title={'changePhone.headerOtp'} hasBorderBottom={false} />
            <View style={styles.container}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_OTP}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoFocus={true}
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
                <StyledText i18nText={'changePhone.resendSms'} customStyle={styles.btnResend} onPress={resendOtp} />
                <StyledButton
                    title={'changePhone.btnChange'}
                    onPress={onPressChangePhone}
                    disabled={disabledBtn}
                    customStyle={styles.btnNext}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = ScaledSheet.create({
    containerKeyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
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
        marginTop: '38@vs',
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
});

export default OtpChangePhoneView;
