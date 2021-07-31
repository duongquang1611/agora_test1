import { Themes } from 'assets/themes';
import { DATA_URL, staticValue } from 'feature/staticData';
import { TAB_NAVIGATION_ROOT, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { getConfig } from 'utilities/convert';
import HeaderAccountView from './components/HeaderAccountView';
import ItemAccount from './components/ItemAccount';

const AccountView = () => {
    const { userInfo } = useSelector((state: any) => state);
    const { user: { phone = '' } = {} } = userInfo;
    const { CONFIG_KEY } = staticValue;
    const manualUrl = getConfig(CONFIG_KEY.WEB_TUTORIAL)?.value;
    const contactUrl = getConfig(CONFIG_KEY.WEB_CONTACT)?.value;
    const termUrl = getConfig(CONFIG_KEY.WEB_TERM)?.value;
    const policyUrl = getConfig(CONFIG_KEY.WEB_POLICY)?.value;
    const goToPersonInfo = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.PERSON_INFO);
    };
    const goToSettingNotification = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.SETTINGS_NOTIFICATION);
    };
    const onPressManual = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: manualUrl || DATA_URL.manual,
        });
    };
    const onPressContact = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: contactUrl || DATA_URL.contact,
        });
    };
    const onPressPolicy = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: policyUrl || DATA_URL.policy,
        });
    };
    const onPressTerms = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: termUrl || DATA_URL.terms,
        });
    };
    return (
        <SafeAreaView style={styles.flex1}>
            <HeaderAccountView phone={phone} />
            <ItemAccount title={'account.personInfo'} onPress={goToPersonInfo} />
            <ItemAccount title={'account.notification'} onPress={goToSettingNotification} />
            <ItemAccount title={'account.manual'} onPress={onPressManual} />
            <ItemAccount title={'account.help'} onPress={onPressContact} />
            <ItemAccount title={'account.policy'} onPress={onPressPolicy} />
            <ItemAccount title={'account.terms'} onPress={onPressTerms} hasSeparator={false} />
            <View style={styles.grayBg} />
        </SafeAreaView>
    );
};
const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    grayBg: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
    },
    itemStyleContainer: {
        height: '45@vs',
    },
});
export default AccountView;
