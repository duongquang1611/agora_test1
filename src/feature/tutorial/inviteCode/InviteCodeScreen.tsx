import { verifyRegistrationCode } from 'api/modules/api-app/authenticate';
import { updateCommon } from 'app-redux/common/actions';
import { Themes } from 'assets/themes';
import { StyledInput, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { staticValue } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { AUTHENTICATE_ROUTE, IDENTIFY_ROUTE, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

const InviteCodeScreen = () => {
    const { common } = useSelector((state: any) => state);
    useBackHandler();
    const { showTerms } = common;
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const { INVITE_CODE_LENGTH } = staticValue;
    const onChangeText = (text: string) => {
        setValue(text);
    };
    const getDataInviteCode = async () => {
        try {
            const response = await verifyRegistrationCode(value);
            const { data } = response;
            if (data.length > 0) {
                Keyboard.dismiss();
                dispatch(updateCommon({ typeInviteCode: data?.[0]?.type, inviteCode: value }));
                navigate(showTerms ? IDENTIFY_ROUTE.TERMS : AUTHENTICATE_ROUTE.LOGIN);
            } else {
                setErrorMessage('tutorial.inviteCode.error');
            }
        } catch (error) {
            AlertMessage(error);
            setErrorMessage('tutorial.inviteCode.error');
        }
    };
    useEffect(() => {
        if (value.length === INVITE_CODE_LENGTH) getDataInviteCode();
        else !!errorMessage && setErrorMessage('');
    }, [value]);
    const onPressNoHaveCode = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, { url: staticValue.LANDING_PAGE });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <StyledText i18nText="tutorial.inviteCode.title" customStyle={styles.title} />
                <StyledInput
                    customPlaceHolder="tutorial.inviteCode.placeholder"
                    containerStyle={styles.customStyleInput}
                    showClear={true}
                    value={value}
                    keyboardType={'number-pad'}
                    onChangeText={onChangeText}
                    maxLength={INVITE_CODE_LENGTH}
                    errorMessage={errorMessage}
                    autoFocus={true}
                />
                <View style={styles.underline}>
                    <StyledText
                        i18nText="tutorial.inviteCode.noHaveCode"
                        customStyle={styles.noHaveCode}
                        onPress={onPressNoHaveCode}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingHorizontal: '30@s',
        alignItems: 'center',
        paddingVertical: '100@vs',
    },
    title: {
        fontSize: '20@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
    },
    noHaveCode: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        color: Themes.COLORS.primary,
        marginTop: '40@vs',
    },
    customStyleInput: {
        borderBottomWidth: 1,
        marginTop: '20@vs',
    },
    underline: {
        borderBottomWidth: 0.5,
        borderColor: Themes.COLORS.primary,
    },
});

export default InviteCodeScreen;
