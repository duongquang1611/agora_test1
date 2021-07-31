import { StyledList } from 'components/base';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

interface ListMessageProp {
    data: any;
    renderItem: any;
    contentChange?: () => void;
}
const ListMessage = (props: ListMessageProp, ref?: any) => {
    const { data = [], renderItem } = props;
    return (
        <StyledList
            ref={ref}
            onContentSizeChange={props.contentChange}
            keyExtractor={(item: any) => item.createdAt.toString()}
            inverted
            data={data}
            initialNumToRender={5}
            renderItem={renderItem}
            customStyle={styles.contentList}
            refreshControl={null}
            showsVerticalScrollIndicator={true}
            bounces={false}
            noDataText={''}
        />
    );
};
const styles = ScaledSheet.create({
    contentList: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
        paddingVertical: '5@vs',
        paddingHorizontal: '20@s',
    },
});

export default React.memo(React.forwardRef(ListMessage));
