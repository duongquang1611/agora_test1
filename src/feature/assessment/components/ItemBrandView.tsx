import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';

interface ItemBrandProps {
    customStyle?: StyleProp<TextStyle>;
    name: string;
    onPress?(): void;
}

const ItemBrandView = (props: ItemBrandProps) => {
    const { customStyle, name, onPress } = props;
    return (
        <StyledTouchable customStyle={[styles.container, customStyle]} onPress={onPress}>
            <StyledText i18nText={name} customStyle={styles.name} />
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        marginLeft: 29,
        paddingVertical: 13,
    },
    name: {
        fontSize: 13,
        color: Themes.COLORS.textPrimary,
    },
});

export default ItemBrandView;
