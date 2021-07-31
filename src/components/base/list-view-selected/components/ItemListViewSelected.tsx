import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon } from 'components/base';
import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, Text, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemListProps {
    name: string;
    isActive?: boolean;
    onPressItem?(item: any): void;
    isDisabled?: boolean;
    customStyleItem?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
}
const ItemListViewSelected = (props: ItemListProps) => {
    const { onPressItem, isDisabled, customStyleItem, customStyleText, name, isActive } = props;

    return (
        <>
            <TouchableOpacity
                onPress={onPressItem}
                activeOpacity={isDisabled ? 1 : 0.6}
                style={[styles.container, customStyleItem, {}]}
            >
                <Text style={[styles.text, customStyleText]}>{name}</Text>
                {isActive && <StyledIcon size={15} source={Images.icons.selected} />}
            </TouchableOpacity>
            <View style={styles.seperator} />
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20@s',
        paddingVertical: '10@vs',
    },

    text: {
        fontSize: 18,
        lineHeight: 20,
        width: '95%',
        color: Themes.COLORS.black,
    },
    seperator: {
        height: 0.8,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.gallery,
    },
});
export default React.memo(ItemListViewSelected, (prev, next) => {
    return prev.isActive === next.isActive;
});
