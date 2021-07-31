import { getOtpChangePhone } from 'api/account';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import { validatePhoneWithLength } from 'utilities/validate';

const ChangePhoneNumber = () => {
    const { userInfo } = useSelector((state: any) => state);
    const {
        user: { phone },
    } = userInfo;
    const { LENGTH_PHONE } = staticValue;
    const [valuePhone, setValuePhone] = React.useState('');
    const isValidPhone = validatePhoneWithLength(valuePhone);
    const requestOtp = async () => {
        try {
            await getOtpChangePhone(valuePhone);
            navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.OTP_CHANGE_PHONE, { newPhone: valuePhone });
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const onChangeText = (text: string) => {
        setValuePhone(text);
    };
    return (
        <>
            <StyledHeader title={'changePhone.title'} />
            <View style={styles.container}>
                <StyledText
                    i18nText={'changePhone.currentPhone'}
                    i18nParams={{ phone }}
                    customStyle={styles.textCurrentPhone}
                />
                <StyledInput
                    customPlaceHolder={'changePhone.placeholder'}
                    containerStyle={styles.inputStyle}
                    onChangeText={onChangeText}
                    value={valuePhone}
                    maxLength={LENGTH_PHONE}
                    keyboardType={'phone-pad'}
                    customStyle={styles.customStyleInput}
                    autoFocus={true}
                />
                <StyledButton
                    title={'changePhone.sendSMS'}
                    onPress={requestOtp}
                    customStyle={styles.btnSendSMS}
                    disabled={!isValidPhone}
                />
                <View style={styles.grayBg} />
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingVertical: '40@s',
        paddingHorizontal: '40@s',
        backgroundColor: Themes.COLORS.accountView.background,
    },
    grayBg: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
    },
    textCurrentPhone: {
        fontSize: '13@ms',
        fontWeight: '300',
        lineHeight: '19.5@vs',
        marginBottom: 36,
    },
    inputStyle: {
        backgroundColor: Themes.COLORS.white,
        paddingHorizontal: 12,
        alignSelf: 'center',
        height: '44@vs',
        borderRadius: 0,
    },
    btnSendSMS: {
        width: '100%',
        marginTop: '24@vs',
    },
    customStyleInput: {
        fontSize: '15@ms',
        fontWeight: '300',
    },
});

export default ChangePhoneNumber;
