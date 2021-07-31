import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemBankProps {
    customStyle?: StyleProp<TextStyle>;
    onPress?(item: any): void;
    item: any;
}

const ItemBank = (props: ItemBankProps) => {
    const { customStyle, onPress, item } = props;
    const onPressItem = () => {
        onPress?.(item);
    };
    return (
        <StyledTouchable customStyle={[styles.container, customStyle]} onPress={onPressItem}>
            <StyledText i18nText={item?.name} customStyle={styles.name} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        marginLeft: 29,
        height: '50@vs',
        justifyContent: 'center',
    },
    name: {
        fontSize: '13@ms',
        color: Themes.COLORS.textPrimary,
    },
});

export default ItemBank;
