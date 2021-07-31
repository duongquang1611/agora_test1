import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View, StyleSheet, ImageProps, StyleProp, TextStyle } from 'react-native';

interface MethodProps {
    iconMethod: ImageProps;
    nameMethod: string;
    isActive?: boolean;
    customStyle?: StyleProp<TextStyle>;
    size: any;
    onPress?(): void;
    isRecommend?: boolean;
}

const ItemMethodView = (props: MethodProps) => {
    const { iconMethod, nameMethod, isActive = false, customStyle, size, onPress, isRecommend } = props;
    return (
        <StyledTouchable
            customStyle={[
                styles.viewItem,
                customStyle,
                {
                    borderColor: isActive
                        ? Themes.COLORS.assessment.borderMethodActive
                        : Themes.COLORS.assessment.borderMethod,
                },
            ]}
            onPress={onPress}
        >
            {isRecommend && (
                <View style={styles.viewRecommend}>
                    <StyledText i18nText={'assessment.recommend'} customStyle={styles.recommend} />
                </View>
            )}
            <View style={styles.viewMethod}>
                <StyledImage
                    source={iconMethod}
                    customStyle={[styles.iconMethod, { width: size?.width, height: size?.height }]}
                />
                <StyledText
                    i18nText={nameMethod}
                    customStyle={[
                        styles.nameMethod,
                        {
                            color: isActive
                                ? Themes.COLORS.assessment.titlePicture
                                : Themes.COLORS.assessment.nameMethod,
                        },
                    ]}
                />
            </View>
            {isActive && (
                <StyledIcon source={Images.icons.assessment.iconCheck} customStyle={styles.iconActive} size={22} />
            )}
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 19,
    },
    iconMethod: {
        marginLeft: 29,
    },
    iconActive: {
        marginRight: 21,
    },
    viewMethod: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 37,
    },
    viewCheck: {},
    viewRecommend: {
        width: 68,
        height: 68,
        borderRadius: 34,
        borderColor: Themes.COLORS.assessment.borderMethodActive,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -34,
        left: -34,
        backgroundColor: Themes.COLORS.white,
    },
    nameMethod: {
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 12,
    },
    recommend: {
        fontSize: 12,
        fontWeight: '700',
        color: Themes.COLORS.assessment.borderMethodActive,
    },
});

export default ItemMethodView;
