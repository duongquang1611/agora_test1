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
const NotSellList = ({ initData }: Props) => {
    const renderItemNotSell = useCallback(({ item }: any) => <HistoryItem hasButton item={item} />, []);
    return (
        <View style={styles.flex1}>
            <StyledList
                customStyle={styles.listStyle}
                emptyIcon={Images.icons.emptyHistoryList}
                noDataText="history.empty.listNotify"
                data={initData}
                renderItem={renderItemNotSell}
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

export default memo(NotSellList);
