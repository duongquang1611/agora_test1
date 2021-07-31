import Images from 'assets/images';
import { StyledList } from 'components/base';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import HistoryItem from '../components/HistoryItem';

interface Props {
    tabLabel?: string;
    initData?: any[];
}
const PendingShipList = ({ initData }: Props) => {
    // cmt de phong truong hop phan trang get list transaction
    // const { pagingData, onLoadMore, onRefresh } = usePaging(getTransactionList, {
    //     status: staticValue.ALL_TRANSACTION_STATUS.SUCCESS,
    // });
    // const isFocused = useIsFocused();
    // useEffect(() => {
    //     isFocused && onRefresh();
    // }, [isFocused]);

    const renderItemPendingShip = useCallback(({ item }: any) => <HistoryItem firstTab hasButton item={item} />, []);
    return (
        <View style={styles.flex1}>
            <StyledList
                customStyle={styles.listStyle}
                emptyIcon={Images.icons.emptyHistoryList}
                noDataText="history.empty.listNotify"
                data={initData}
                renderItem={renderItemPendingShip}
                keyExtractor={(item: any) => item.id.toString()}
                initialNumToRender={5}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={9}
                updateCellsBatchingPeriod={100} // Increase time between renders
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    listStyle: {
        flexGrow: 1,
    },
});

export default memo(PendingShipList);
