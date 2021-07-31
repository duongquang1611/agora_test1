import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledText, StyledTouchable } from './base';

interface ModalSuccessProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    sizeIcon?: number;
    onPressIcon?(): void;
}
const ModalSuccess = (props: ModalSuccessProps) => {
    const { title = '', sizeIcon = 18, customStyle, onPressIcon } = props;
    return (
        <View style={[styles.container, customStyle]}>
            <StyledText i18nText={title} customStyle={styles.title} numberOfLines={3} />
            <StyledTouchable customStyle={styles.containerIcon} onPress={onPressIcon}>
                <StyledIcon size={sizeIcon} source={Images.icons.selected} customStyle={styles.icon} />
            </StyledTouchable>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        width: '237@s',
        borderRadius: 10,
        paddingVertical: '33@vs',
        alignItems: 'center',
        paddingHorizontal: '10@s',
    },
    title: {
        fontSize: '14@ms',
    },
    containerIcon: {
        borderRadius: 30,
        height: '33@s',
        width: '33@s',
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '24@vs',
    },
    icon: {
        tintColor: Themes.COLORS.white,
    },
});

export default ModalSuccess;
