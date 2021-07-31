import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemProvince = ({ item, selected, setSelected }: any) => {
    const isSelected = selected === item?.id;
    const onSelect = () => {
        if (isSelected) setSelected();
        else setSelected(item?.id);
    };
    return (
        <StyledTouchable customStyle={styles.container} onPress={onSelect}>
            <View style={styles.checkContainer}>
                {isSelected && (
                    <StyledIcon size={15} source={Images.icons.tutorial.check} customStyle={styles.iconCheck} />
                )}
            </View>
            <StyledText
                i18nText={item?.name}
                customStyle={[
                    styles.textProvince,
                    { color: isSelected ? Themes.COLORS.black : Themes.COLORS.homeView.textProvince },
                ]}
            />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '18@vs',
    },
    iconCheck: {
        tintColor: Themes.COLORS.primary,
        marginRight: '12@s',
    },
    textProvince: {
        color: Themes.COLORS.homeView.textProvince,
        fontSize: '20@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
    },
    checkContainer: {
        width: '30@s',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ItemProvince;
