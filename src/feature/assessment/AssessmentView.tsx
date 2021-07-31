import { useNavigation } from '@react-navigation/native';
import { updateCategory } from 'app-redux/product/actions';
import { Themes } from 'assets/themes';
import StyledHeader from 'components/common/StyledHeader';
import { ICON_CATEGORY, staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemListCategoryView from './components/ItemListCategoryView';

const AssessmentView = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { categories } = useSelector((state: any) => state.resource);
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.title'} hasBack={false} />
            <View style={styles.viewItem}>
                {categories.map((item: any, index: number) => (
                    <ItemListCategoryView
                        key={index}
                        title={item?.name}
                        iconLeft={ICON_CATEGORY[index].iconLeft}
                        iconRight={ICON_CATEGORY[index].iconRight}
                        onPress={() => {
                            dispatch(updateCategory({ categoryId: item?.id, name: item?.name }));
                            navigation.navigate(ASSESSMENT_ROUTE.BRAND_CATEGORY_VIEW, { typeCategory: index + 1 });
                        }}
                        customStyle={styles.itemList}
                        isBottom={index === categories.length - staticValue.DEFAULT_VALUE}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    item: {
        marginVertical: 10,
    },
    viewItem: {
        marginTop: 5,
    },
    itemList: {
        marginLeft: 22,
    },
});

export default AssessmentView;
