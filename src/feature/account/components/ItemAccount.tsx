import ItemListText from 'components/ItemListText';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

const ItemAccount = ({ title, onPress, hasSeparator = true }: any) => {
    return <ItemListText {...{ title, onPress, hasSeparator }} customStyle={styles.itemStyleContainer} />;
};
const styles = ScaledSheet.create({
    itemStyleContainer: {
        paddingVertical: '15@vs',
    },
});

export default ItemAccount;
