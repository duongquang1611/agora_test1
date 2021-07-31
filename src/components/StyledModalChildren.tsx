import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import React from 'react';
import { View, ViewProps, TextStyle, StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface StyledModalChildrenProps extends ViewProps {
    title?: string;
    subTitle?: string;
    icon?: any;
    customStyle?: StyleProp<ViewStyle>;
    customStyleTitle?: StyleProp<TextStyle>;
    customStyleSubtitle?: StyleProp<TextStyle>;
    children?: any;
    customSizeIcon?: number;
}

const StyledModalChildren = (props: StyledModalChildrenProps) => {
    const {
        title = '',
        subTitle = '',
        icon,
        customStyle,
        customStyleTitle,
        customStyleSubtitle,
        children,
        customSizeIcon = 25,
    } = props;

    return (
        <View style={[styles.container, customStyle]}>
            {title ? <StyledText i18nText={title} customStyle={[styles.styleTitle, customStyleTitle]} /> : <></>}
            {subTitle ? (
                <StyledText i18nText={subTitle} customStyle={[styles.styleSubtitle, customStyleSubtitle]} />
            ) : (
                <></>
            )}
            {children}
            <StyledIcon source={icon} size={customSizeIcon} customStyle={styles.icon} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: '15@vs',
        paddingHorizontal: '20@s',
        backgroundColor: Themes.COLORS.white,
    },
    styleTitle: {
        fontSize: '20@s',
        fontWeight: '600',
        paddingVertical: '5@vs',
    },
    styleSubtitle: {
        fontSize: '15@s',
        fontWeight: '300',
        paddingVertical: '5@vs',
    },
    icon: {
        paddingVertical: '25@vs',
    },
});

export default StyledModalChildren;
