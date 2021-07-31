import { useIsFocused } from '@react-navigation/native';
import { getTransactionList } from 'api/history';
import { updateHistory } from 'app-redux/history/actions';
import { Themes } from 'assets/themes';
import AlertMessage from 'components/base/AlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue, TAB_HISTORY_TRANSACTION } from 'feature/staticData';
import React, { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import EmptyHistoryScreen from './components/EmptyTab';
import NotSellList from './dataList/notSellList';
import PendingShipList from './dataList/pendingShipList';
import SentList from './dataList/sentList';

const HistoryScreen: React.FunctionComponent = ({ route }: any) => {
    const { t } = useTranslation();
    const { PENDING_SHIP } = TAB_HISTORY_TRANSACTION;
    const { initPage } = route?.params || {};
    const { history: transactions } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const { pending = [], sentAndDone = [], notSell = [], isEmpty = false } = transactions;
    const isFocused = useIsFocused();
    const getData = async () => {
        try {
            const res = await Promise.all([
                getTransactionList({ params: { status: staticValue.ALL_TRANSACTION_STATUS.SUCCESS } }),
                getTransactionList({ params: { status: staticValue.ALL_TRANSACTION_STATUS.SENT_DONE } }),
                getTransactionList({ params: { status: staticValue.ALL_TRANSACTION_STATUS.NOT_OFFER_FAILED } }),
            ]);
            dispatch(
                updateHistory({
                    pending: res?.[0]?.data || [],
                    sentAndDone: res?.[1]?.data || [],
                    notSell: res?.[2]?.data || [],
                    isEmpty:
                        res?.[0]?.data?.length === 0 && res?.[1]?.data?.length === 0 && res?.[2]?.data?.length === 0,
                }),
            );
        } catch (error) {
            AlertMessage(error);
        }
    };
    useEffect(() => {
        isFocused && getData();
    }, [isFocused]);
    const havePendingShip = pending.length !== 0;
    const newInitPage = useMemo(() => (initPage ? (havePendingShip ? initPage : initPage - 1) : PENDING_SHIP), [
        initPage,
        havePendingShip,
    ]);
    return (
        <View style={styles.container}>
            <StyledHeader title="history.title" hasBack={false} />
            {isEmpty ? (
                <EmptyHistoryScreen />
            ) : (
                <ScrollableTabView
                    tabBarActiveTextColor={Themes.COLORS.primary}
                    tabBarInactiveTextColor={Themes.COLORS.black}
                    tabBarUnderlineStyle={{ backgroundColor: Themes.COLORS.primary }}
                    initialPage={newInitPage}
                >
                    {havePendingShip && <PendingShipList initData={pending} tabLabel={t('history.pendingShipList')} />}
                    <SentList initData={sentAndDone} tabLabel={t('history.sentList')} />
                    <NotSellList initData={notSell} tabLabel={t('history.notSellList')} />
                </ScrollableTabView>
            )}
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    containerHeaderSectionList: {
        backgroundColor: Themes.COLORS.backgroundSectionHeader,
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
    },
    containerItemList: {
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
    },
    itemStyle: {
        paddingHorizontal: '25@s',
        paddingVertical: '10@vs',
    },
    textItem: {
        fontSize: '13@s',
    },
});
export default memo(HistoryScreen);
