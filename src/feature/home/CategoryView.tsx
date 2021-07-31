/* eslint-disable @typescript-eslint/no-unused-vars */
import { getListProduct } from 'api/home';
import { updateCategory } from 'app-redux/product/actions';
import Metrics from 'assets/metrics';
import { StyledList } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ItemCategoryView from './components/ItemCategoryView';

interface CategoryProps {
    product?: any;
    tabLabel?: string;
}
const CategoryView = (props: CategoryProps) => {
    const { product } = props;
    const dispatch = useDispatch();
    const { categories } = useSelector((state: any) => state.resource);
    const renderItemCategory = ({ item }: any) => {
        return (
            <ItemCategoryView
                product={item}
                onPress={() => {
                    const category = categories?.filter((obj: any) => obj.id === item?.categoryId);
                    dispatch(updateCategory({ categoryId: category[0].id, name: category[0]?.name }));
                    navigate(ASSESSMENT_ROUTE.BRAND_CATEGORY_VIEW, { typeCategory: item?.categoryId });
                }}
            />
        );
    };
    return (
        <View style={styles.container}>
            <StyledList data={product} renderItem={renderItemCategory} numColumns={2} horizontal={false} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    noProduct: {},
});

export default CategoryView;
