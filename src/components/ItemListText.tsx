import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View, ViewProps, TextStyle, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemListTextProps extends ViewProps {
    iconRight?: any;
    hasArrow?: boolean;
    title?: string;
    value?: string;
    onPress?(): void;
    customStyle?: StyleProp<ViewStyle>;
    customStyleTitle?: StyleProp<TextStyle>;
    customStyleValue?: StyleProp<TextStyle>;
    disabled?: boolean;
    hasSeparator?: boolean;
    widthLine?: any;
}

const ItemListText = (props: ItemListTextProps) => {
    const {
        hasArrow = false,
        title = '',
        value = '',
        onPress,
        customStyle,
        customStyleTitle,
        customStyleValue,
        disabled,
        hasSeparator = true,
        widthLine = '90%',
    } = props;

    return (
        <>
            <StyledTouchable disabled={disabled} customStyle={[styles.container, customStyle]} onPress={onPress}>
                <StyledText i18nText={title} customStyle={[styles.title, customStyleTitle]} />
                <View style={styles.containerRightView}>
                    <StyledText i18nText={value} customStyle={[styles.value, customStyleValue]} numberOfLines={1} />
                    {hasArrow && <StyledIcon size={15} source={Images.icons.arrowRight} />}
                </View>
            </StyledTouchable>
            {hasSeparator && <View style={[styles.separator, { width: widthLine }]} />}
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20@s',
        paddingRight: '15@s',
        paddingVertical: '10@vs',
        marginRight: '8@s',
        height: '46@vs',
    },
    value: {
        fontSize: '14@s',
        color: Themes.COLORS.cloudy,
        marginRight: '5@s',
        maxWidth: '90%',
    },
    title: {
        fontSize: '14@s',
        color: Themes.COLORS.black,
        flex: 1,
    },
    separator: {
        height: 1,
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.gallery,
    },
    containerRightView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
});

export default ItemListText;
