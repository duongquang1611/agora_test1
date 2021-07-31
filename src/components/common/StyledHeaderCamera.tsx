import { Themes } from 'assets/themes';
import React from 'react';
import { ImageProps, StyleProp, TextStyle, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledText, StyledTouchable } from '../base';

interface HeaderCameraProps {
    iconLeft: ImageProps;
    iconRight: ImageProps;
    customStyle?: StyleProp<TextStyle>;
    title?: string;
    onClose?(): void;
    onFlash?(): void;
    isFlash: boolean;
}

const StyledHeaderCamera = (props: HeaderCameraProps) => {
    const { iconLeft, iconRight, customStyle, title, onClose, onFlash, isFlash } = props;
    return (
        <View style={[styles.container, customStyle]}>
            <StyledTouchable onPress={onClose}>
                {iconLeft && <StyledIcon source={iconLeft} size={17} />}
            </StyledTouchable>
            <StyledText i18nText={title || ''} customStyle={styles.title} />
            <StyledTouchable onPress={onFlash} customStyle={styles.buttonFlash}>
                {iconRight && <StyledIcon source={iconRight} size={16} />}
                {!isFlash && <View style={styles.rule} />}
            </StyledTouchable>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.assessment.buttonConfirm,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: Themes.COLORS.white,
        marginVertical: 18,
    },
    rule: {
        position: 'absolute',
        height: '24@vs',
        width: 1.5,
        top: -2,
        backgroundColor: Themes.COLORS.white,
        transform: [
            {
                rotate: '-40deg',
            },
        ],
    },
    buttonFlash: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20@vs',
        height: '20@vs',
    },
});

export default StyledHeaderCamera;
