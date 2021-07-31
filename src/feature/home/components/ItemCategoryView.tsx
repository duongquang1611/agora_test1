import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { ProgressiveImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface CategoryProps {
    product?: any;
    onPress?(): void;
}

const ItemCategoryView = (props: CategoryProps) => {
    const { product, onPress } = props;
    return (
        <StyledTouchable customStyle={styles.container} onPress={onPress}>
            <View style={styles.category}>
                <ProgressiveImage {...product} resizeMode="contain" />
            </View>
            {/* <StyledFastImage source={{ uri: product?.URL }} customStyle={styles.category} resizeMode="contain" /> */}
            <StyledText i18nText={product?.name} customStyle={styles.name} numberOfLines={1} />
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Metrics.screenWidth / 2,
    },
    category: {
        width: Metrics.screenWidth / 2 - 28,
        height: '160@vs',
        marginTop: '21@vs',
        marginBottom: '5@vs',
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Themes.COLORS.homeView.name,
    },
});

export default ItemCategoryView;
