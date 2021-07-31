import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemCheckBoxProps {
    active: boolean;
    title: string;
    onPressCheck?(): void;
    subTitle?: string;
    customStyle?: StyleProp<ViewStyle>;
    onPressTitle?(): void;
}

const ItemCheckbox: React.FunctionComponent<ItemCheckBoxProps> = (props: ItemCheckBoxProps) => {
    const { active = false, title = '', subTitle = '', customStyle, onPressTitle, onPressCheck } = props;
    return (
        <View style={[styles.container, customStyle]}>
            <StyledTouchable customStyle={styles.containerIconCheck} onPress={onPressCheck}>
                {active && <StyledIcon size={10} source={Images.icons.tutorial.check} />}
            </StyledTouchable>
            <View style={styles.underline}>
                <StyledText i18nText={title} customStyle={[styles.title, styles.subTitle]} onPress={onPressTitle} />
            </View>
            <StyledText i18nText={subTitle} customStyle={styles.subTitle} />
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: '25@s',
        marginTop: '25@vs',
        alignItems: 'center',
    },
    containerIconCheck: {
        borderWidth: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        width: 20,
        height: 20,
        borderColor: Themes.COLORS.cloudy,
    },
    title: {
        color: Themes.COLORS.primary,
    },
    underline: {
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.primary,
        marginRight: 2,
    },
    subTitle: {
        fontSize: '14@ms',
        fontWeight: '300',
    },
});

export default ItemCheckbox;
