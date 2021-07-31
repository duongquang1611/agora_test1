import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemIdMenu = ({ title, onPress }: any) => {
    return (
        <>
            <StyledTouchable customStyle={styles.item} onPress={onPress}>
                <StyledText i18nText={title} />
                <StyledIcon source={Images.icons.arrowRight} size={14} />
            </StyledTouchable>
            <View style={styles.separator} />
        </>
    );
};

const styles = ScaledSheet.create({
    item: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '15@s',
        marginLeft: '10@s',
        paddingLeft: '5@s',
        paddingVertical: '15@vs',
    },
    separator: {
        backgroundColor: Themes.COLORS.separatorColor,
        height: 1,
        marginLeft: '10@s',
    },
});

export default ItemIdMenu;
