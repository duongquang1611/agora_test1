import { Themes } from 'assets/themes';
import React, { useState, useEffect } from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemListViewSelected from './components/ItemListViewSelected';

interface ListViewProps {
    data: any;
    keyText: string;
    onPress?(item: any): void;
    customStyle?: StyleProp<ViewStyle>;
    arraySelected: any;
    isDisabled?: boolean;
    isMultiple: boolean;
    setArraySelected(arraySelected: any): void;
    customStyleItem?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
}

const StyledListViewSelected = (props: ListViewProps) => {
    const [item, setItem] = useState<any>(null);
    const {
        arraySelected,
        setArraySelected,
        isMultiple,
        keyText,
        data,
        isDisabled,
        customStyleItem,
        customStyleText,
    } = props;

    useEffect(() => {
        if (item?.id) {
            if (arraySelected.includes(item?.id)) {
                const tempArray = arraySelected.filter((k: any) => k !== item?.id);
                setArraySelected([...tempArray]);
            } else if (isMultiple) {
                setArraySelected([...arraySelected, item?.id]);
            } else {
                setArraySelected([item?.id]);
            }
        }
    }, [item]);

    return (
        <View style={[styles.container, props.customStyle]}>
            {data.map((itemData: any) => (
                <ItemListViewSelected
                    name={itemData?.[keyText]}
                    isActive={arraySelected.includes(itemData?.id)}
                    key={`${itemData?.id}`}
                    onPressItem={() => setItem({ ...itemData })}
                    isDisabled={isDisabled}
                    customStyleItem={customStyleItem}
                    customStyleText={customStyleText}
                />
            ))}
        </View>
    );
};

export default StyledListViewSelected;
const styles = ScaledSheet.create({
    container: {
        flexWrap: 'wrap',
    },
    seperator: {
        height: 0.8,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.gallery,
    },
});
