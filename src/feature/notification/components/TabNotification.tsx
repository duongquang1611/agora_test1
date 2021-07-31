import { useIsFocused } from '@react-navigation/native';
import { getListNotification, getTotalNotification, updateIsReadNotification } from 'api/modules/api-app/notification';
import { updateNotification } from 'app-redux/notification/actions';
import { Themes } from 'assets/themes';
import { StyledList } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { IS_READ, NAVIGATE_TYPE, RedirectType } from 'feature/staticData';
import usePaging from 'hooks/usePaging';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, HISTORY_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import NotificationItem from './NotificationItem';

const TabNotification = ({ type }: any) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { isRefreshNotification } = useSelector((state: any) => state.notification);

    const { pagingData, onRefresh, setParams, onLoadMore, _setPagingData } = usePaging(getListNotification, {
        type,
    });
    useEffect(() => {
        setParams({ type });
    }, [type, isRefreshNotification]);

    const renderItem = ({ item }: any) => {
        return <NotificationItem item={item} onPress={() => handleNotify(item)} isClick={item?.isRead} />;
    };
    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };
    const handleNotify = async (item: any) => {
        if (item?.isRead) {
            handleNotificationByType(item);
        } else {
            try {
                const result = await updateIsReadNotification(item?.id);
                if (result) {
                    // onRefresh();
                    const newPaging: any = { ...pagingData };
                    newPaging.list = newPaging.list.map((itemNotify: any) => {
                        return itemNotify.id === item.id
                            ? {
                                  ...itemNotify,
                                  isRead: IS_READ.READ,
                              }
                            : itemNotify;
                    });
                    _setPagingData(newPaging);
                    getNotificationInRead();
                    handleNotificationByType(item);
                }
            } catch (err) {
                logger(err);
                AlertMessage(err);
            }
        }
    };
    useEffect(() => {
        if (isFocused) {
            getNotificationInRead();
        }
    }, [isFocused]);
    const getNotificationInRead = async () => {
        try {
            const total = await getTotalNotification();
            if (total) {
                dispatch(
                    updateNotification({
                        totalNotification: total?.data?.totalAllNotifiedUnread,
                        allNotification: total?.data?.totalCommonNotifiedUnread,
                        personalNotification: total?.data?.totalPersonNotifiedUnread,
                    }),
                );
            }
        } catch (err) {
            AlertMessage(err);
        }
    };
    const handleNotificationByType = (item: any) => {
        switch (item?.redirectType) {
            case RedirectType.HOME:
                break;
            case RedirectType.DETAIL_TRANSACTION:
                navigate(HISTORY_ROUTE.DETAIL, { transactionId: item?.redirectId });
                break;
            case RedirectType.TRANSACTION:
                break;
            case RedirectType.OFFER:
                break;
            case RedirectType.MEMBER_BANK:
                navigate(ASSESSMENT_ROUTE.SELECT_TRANSFER, { navigateFrom: NAVIGATE_TYPE.SETTING });
                break;
            case RedirectType.MEMBER_ID_CARD:
                navigate(ACCOUNT_ROUTE.CHANGE_ID_MENU, { navigateFrom: NAVIGATE_TYPE.SETTING });
                break;
            case RedirectType.SHIP:
                navigate(HISTORY_ROUTE.DETAIL, { transactionId: item?.redirectId });
                break;
            case RedirectType.MEMBER_ADDRESS:
                navigate(ACCOUNT_ROUTE.ADDRESS, { navigateFrom: NAVIGATE_TYPE.SETTING });
                break;
            case RedirectType.UPDATE_PARCEL_CODE:
                navigate(HISTORY_ROUTE.DETAIL, {
                    transactionId: item?.redirectId,
                    autoShowModal: true,
                });
                break;
            case RedirectType.CONVERSATION:
                break;
            case RedirectType.VIDEO_CALL:
                break;
            case RedirectType.REFUSED_TRANSACTION:
                break;
            default:
                break;
        }
    };
    return (
        <View style={styles.container}>
            <StyledList
                data={pagingData.list}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                refreshing={pagingData.refreshing}
                onRefresh={onRefresh}
                onLoadMore={onLoadMore}
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: Themes.COLORS.textSecondary,
        marginLeft: '82@s',
    },
});

export default TabNotification;
