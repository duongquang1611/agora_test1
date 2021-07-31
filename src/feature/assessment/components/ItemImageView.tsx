import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';

interface ImageProps {
    image: any;
    onPress?(): void;
    disabled?: boolean;
    width?: number;
    height?: number;
    customStyle?: StyleProp<TextStyle>;
    isSquare?: boolean;
    viewNull?: boolean;
}
const ItemImageView = (props: ImageProps) => {
    const {
        image = {},
        onPress,
        disabled = true,
        width = 145,
        height = 148,
        customStyle,
        isSquare = true,
        viewNull = false,
    } = props;
    return (
        <StyledTouchable
            onPress={onPress}
            disabled={disabled}
            customStyle={[
                styles.buttonImage,
                customStyle,
                { width: scale(width), height: isSquare ? scale(height) : verticalScale(height) },
            ]}
        >
            {image?.URL && !viewNull ? (
                <StyledIcon source={Images.icons.assessment.iconPhoto} size={28} customStyle={styles.iconCamera} />
            ) : null}
            {!image?.URL && viewNull ? (
                <>
                    <StyledIcon source={Images.icons.assessment.iconPhoto} size={28} />
                    <StyledText i18nText={'assessment.take'} customStyle={styles.take} />
                </>
            ) : null}
            <ProgressiveImage
                {...image}
                style={[
                    styles.image,
                    { width: scale(width), height: isSquare ? scale(height) : verticalScale(height) },
                ]}
            />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    buttonImage: {
        backgroundColor: Themes.COLORS.assessment.buttonPicture,
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCamera: {
        tintColor: Themes.COLORS.assessment.confirm.camera,
        position: 'absolute',
        top: 15,
        right: 14,
    },
    take: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.take,
        marginTop: 7,
    },
});

export default ItemImageView;
