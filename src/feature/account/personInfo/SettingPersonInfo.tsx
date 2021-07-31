import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import { NAVIGATE_TYPE } from 'feature/staticData';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemAccount from '../components/ItemAccount';

const SettingPersonInfo = () => {
    const { SETTING } = NAVIGATE_TYPE;
    const goToChangeId = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.CHANGE_ID, { confirm: false, navigateFrom: SETTING });
    };
    const goToChangePhone = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.CHANGE_PHONE);
    };
    const goToChangeAddress = () => {
        navigate(TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ADDRESS, {
            navigateFrom: SETTING,
        });
    };
    const changeDestination = () => {
        navigate(TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.SELECT_TRANSFER, {
            navigateFrom: SETTING,
        });
    };
    return (
        <View style={styles.flex1}>
            <StyledHeader title={'personInfo.title'} />
            <ItemAccount title={'personInfo.changeDestination'} onPress={changeDestination} />
            <ItemAccount title={'personInfo.changeAddress'} onPress={goToChangeAddress} />
            <ItemAccount title={'personInfo.changeId'} onPress={goToChangeId} />
            <ItemAccount title={'personInfo.changePhoneNumber'} onPress={goToChangePhone} />
            <View style={styles.grayBg} />
        </View>
    );
};

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    grayBg: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
    },
});

export default SettingPersonInfo;
