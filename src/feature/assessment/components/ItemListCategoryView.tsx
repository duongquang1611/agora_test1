import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { staticValue } from 'feature/staticData';
import React from 'react';
import { StyleSheet, StyleProp, TextStyle, ImageProps, View } from 'react-native';

interface ItemListCategoryProps {
    iconLeft: ImageProps;
    title?: string;
    iconRight: ImageProps;
    customStyle?: StyleProp<TextStyle>;
    onPress?(): void;
    isBottom?: boolean;
}

const ItemListCategoryView = (props: ItemListCategoryProps) => {
    const { iconLeft, iconRight, title, customStyle, onPress, isBottom } = props;
    return (
        <StyledTouchable customStyle={[styles.container, customStyle]} onPress={onPress}>
            <StyledIcon source={iconLeft} size={26} customStyle={styles.iconLeft} />
            <View style={[styles.viewRight, { borderBottomWidth: isBottom ? 0 : staticValue.DEFAULT_VALUE }]}>
                <StyledText i18nText={title || ''} customStyle={styles.title} />
                <StyledIcon source={iconRight} size={14} customStyle={styles.iconLeft} />
            </View>
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconLeft: {
        marginRight: 20,
    },
    title: {
        fontSize: 15,
        color: Themes.COLORS.textPrimary,
    },
    viewRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        paddingVertical: 18,
        borderBottomColor: Themes.COLORS.gallery,
    },
});

export default ItemListCategoryView;
