import { Themes } from 'assets/themes';
import { StyledIcon, StyledText } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemProps {
    icon: any;
    title: string;
    value: string;
}

const ItemFeatureApp: React.FunctionComponent<ItemProps> = (props: ItemProps) => {
    const { icon, title = '', value = '' } = props;
    return (
        <View style={styles.containerItem}>
            <View style={styles.containerIcon}>
                <StyledIcon source={icon} size={25} />
            </View>
            <View>
                <StyledText i18nText={title} customStyle={styles.title} />
                <StyledText i18nText={value} customStyle={styles.value} />
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    containerItem: {
        flexDirection: 'row',
        paddingHorizontal: '44@s',
        paddingVertical: '25@vs',
        alignItems: 'center',
    },
    containerIcon: {
        borderWidth: 0.8,
        borderColor: Themes.COLORS.primary,
        width: '63@s',
        height: '63@s',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        padding: 10,
        marginRight: '15@s',
    },
    title: {
        fontSize: '16@ms',
        fontWeight: '600',
        lineHeight: '24@vs',
        paddingBottom: '5@vs',
    },
    value: {
        fontSize: '14@ms',
        fontWeight: '300',
        lineHeight: '21@vs',
        color: Themes.COLORS.textSecondary,
    },
});
export default ItemFeatureApp;
