/* eslint-disable @typescript-eslint/no-unused-vars */
import { getTotalNotification } from 'api/modules/api-app/notification';
import { updateNotification } from 'app-redux/notification/actions';
import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue, TYPE_NOTIFY } from 'feature/staticData';
import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import HeaderItem from './components/HeaderItem';
import TabNotification from './components/TabNotification';

const NotificationView = ({ route }: any) => {
    const { params } = route;
    const { allNotification, personalNotification } = useSelector((state: any) => state.notification);
    const dispatch = useDispatch();
    const { ALL, ME } = TYPE_NOTIFY;
    const [activeTab, setActiveTab] = useState(ALL);
    const isAllTab = activeTab === ALL;
    useEffect(() => {
        setActiveTab(params?.type === staticValue.NOTIFICATION_PERSONAL ? ME : ALL);
    }, [params?.type]);
    // useEffect(() => {
    //     (async () => {
    //         const notification = await getTotalNotification();
    //         if (notification) {
    //             dispatch(
    //                 updateNotification({
    //                     totalNotification: notification?.data?.totalAllNotifiedUnread,
    //                     allNotification: notification?.data?.totalCommonNotifiedUnread,
    //                     personalNotification: notification?.data?.totalPersonNotifiedUnread,
    //                 }),
    //             );
    //         }
    //     })();
    // }, [activeTab]);
    return (
        <View style={styles.container}>
            <StyledHeader title={'notification.title'} hasBack={false} />
            <View style={styles.containerHeaderTab}>
                <HeaderItem
                    title={'notification.all'}
                    onPress={() => {
                        !isAllTab && setActiveTab(ALL);
                    }}
                    customStyle={{ backgroundColor: Themes.COLORS[isAllTab ? 'primary' : 'white'] }}
                    titleStyle={{ color: Themes.COLORS[isAllTab ? 'white' : 'primary'] }}
                    isActive={isAllTab}
                    totalNotification={allNotification}
                />
                <HeaderItem
                    title={'notification.me'}
                    onPress={() => isAllTab && setActiveTab(ME)}
                    customStyle={{ backgroundColor: Themes.COLORS[isAllTab ? 'white' : 'primary'] }}
                    titleStyle={{ color: Themes.COLORS[isAllTab ? 'primary' : 'white'] }}
                    isActive={!isAllTab}
                    totalNotification={personalNotification}
                />
            </View>
            <View style={styles.body}>
                <TabNotification type={activeTab} />
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    body: {
        flex: 1,
        marginTop: '15@vs',
        backgroundColor: Themes.COLORS.white,
    },
    containerHeaderTab: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: Themes.COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: '25@vs',
    },
    separator: {
        height: 0.5,
        backgroundColor: Themes.COLORS.textSecondary,
        marginLeft: '82@s',
    },
});
export default memo(NotificationView);
