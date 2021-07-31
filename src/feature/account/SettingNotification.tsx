import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText } from 'components/base';
import { updateEnableNotification, updateEnableNotificationShip } from 'api/modules/api-app/notification';
import { staticValue } from 'feature/staticData';
import logger from 'redux-logger';
import { useState } from 'react';
import AlertMessage from 'components/base/AlertMessage';
import StyledSwitch from './components/StyledSwitch';

const SettingNotification = () => {
    const [notification, setNotification] = useState(true);
    const [notificationShip, setNotificationShip] = useState(true);
    const updateNotificationShip = async (value: any) => {
        try {
            const result = await updateEnableNotificationShip(
                value ? staticValue.ENABLED_NOTIFICATION : staticValue.DISABLED_NOTIFICATION,
            );
            if (result) {
                setNotificationShip(!notificationShip);
            }
        } catch (err) {
            logger(err);
            AlertMessage(err);
        }
    };
    const updateNotification = async (value: any) => {
        try {
            const result = await updateEnableNotification(
                value ? staticValue.ENABLED_NOTIFICATION : staticValue.DISABLED_NOTIFICATION,
            );
            if (result) {
                setNotification(!notification);
            }
        } catch (err) {
            logger(err);
            AlertMessage(err);
        }
    };
    return (
        <View style={styles.flex1}>
            <StyledHeader title="noticeSetting.title" />
            <View style={styles.content}>
                <View style={styles.item}>
                    <StyledText i18nText="noticeSetting.shipNotification" />
                    <StyledSwitch
                        isOn={notificationShip}
                        setOn={setNotificationShip}
                        onPress={(num: number) => updateNotificationShip(num)}
                    />
                </View>
                <View style={styles.item}>
                    <StyledText i18nText="noticeSetting.notice" />
                    <StyledSwitch
                        isOn={notification}
                        setOn={setNotification}
                        onPress={(num: number) => updateNotification(num)}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    content: {
        backgroundColor: Themes.COLORS.backgroundPrimary,
        flex: 1,
        paddingVertical: '30@vs',
    },
    item: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        borderColor: Themes.COLORS.backgroundPrimary,
        borderWidth: 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
    },
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
export default SettingNotification;
