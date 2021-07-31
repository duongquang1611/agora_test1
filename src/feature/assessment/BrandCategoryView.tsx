import { useNavigation } from '@react-navigation/native';
import { apiResource } from 'api/resource';
import { deleteProduct, updateBrand } from 'app-redux/product/actions';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledAlphabetSectionList, StyledImage, StyledList, StyledText, StyledTouchable } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, View } from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { isIos, logger } from 'utilities/helper';
import ItemBrandView from './components/ItemBrandView';

const BrandCategoryView = (data: any) => {
    const { route } = data;
    const { params } = route;
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { brands } = useSelector((state: any) => state.resource);
    const [search, setSearch] = useState<any>();
    const [dataBrand, setDataBrand] = useState<any>([]);
    const [dataSearch, setDataSearch] = useState<any>([]);
    const noBrand = brands?.find((obj: any) => obj.id === 1);

    useEffect(() => {
        search !== undefined && getListBrands(search);
    }, [search]);

    useEffect(() => {
        !isIos && AndroidKeyboardAdjust.setAdjustPan();
        const resultBrand = brands?.filter((obj: any) => obj.id > staticValue.ID_NO_BRAND);
        setDataBrand([...resultBrand]);
        return () => {
            !isIos && AndroidKeyboardAdjust.setAdjustResize();
        };
    }, []);

    const getListBrands = useCallback(async (keyword: string) => {
        try {
            const res = await apiResource.getBrands(keyword);
            setDataSearch(res.data || []);
        } catch (error) {
            logger(error);
        }
    }, []);

    const renderBrand = ({ item }: any) => (
        <ItemBrandView
            name={item?.name}
            key={item.id}
            onPress={() => {
                dispatch(updateBrand({ brandId: item?.id, name: item?.name }));
                params?.typeCategory === staticValue.TYPE_BRAND_NOT_EXIST
                    ? handlePreciousHasBrand()
                    : handleAssessmentProduct();
            }}
        />
    );

    const renderSearch = ({ item }: any) => (
        <ItemBrandView
            name={item?.name}
            key={item?.id}
            customStyle={styles.itemSearch}
            onPress={() => {
                dispatch(updateBrand({ brandId: item?.id, name: item?.name }));
                params?.typeCategory === staticValue.TYPE_BRAND_NOT_EXIST
                    ? handlePreciousHasBrand()
                    : handleAssessmentProduct();
            }}
        />
    );

    const handleAssessmentProduct = () => {
        dispatch(deleteProduct());
        navigation.navigate(ASSESSMENT_ROUTE.ASSESSMENT_PRODUCT, { type: params?.typeCategory });
    };

    const handlePreciousHasBrand = () => {
        dispatch(deleteProduct());
        navigation.navigate(ASSESSMENT_ROUTE.PRECIOUS_HAS_BRAND);
    };

    const renderNoData = () => (
        <View style={styles.viewNodata}>
            <StyledText i18nText={'brand.noCategory'} customStyle={styles.noCategory} />
            {params?.typeCategory === staticValue.TYPE_BRAND_NOT_EXIST && (
                <StyledTouchable
                    customStyle={styles.buttonShowBill}
                    onPress={() => navigation.navigate(ASSESSMENT_ROUTE.TAKE_CERTIFICATE)}
                >
                    <StyledText i18nText={'brand.brandNotFound'} customStyle={styles.bandNotFound} />
                </StyledTouchable>
            )}
        </View>
    );

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    return (
        <View style={styles.container}>
            <StyledHeader title={'brand.title'} hasBorderBottom={false} />
            <View style={styles.viewSearch}>
                <StyledImage source={Images.icons.assessment.iconSearch} customStyle={styles.iconSearch} />
                <TextInput
                    value={search}
                    placeholder={t('brand.search')}
                    style={styles.inputSearch}
                    placeholderTextColor={Themes.COLORS.assessment.placeHolderSearch}
                    onChangeText={setSearch}
                />
            </View>
            {params?.typeCategory === staticValue.TYPE_BRAND_NOT_EXIST && !search && dataSearch ? (
                <StyledText
                    i18nText={'assessment.brandNotExist'}
                    customStyle={styles.textBrandNotExist}
                    onPress={() => {
                        dispatch(updateBrand({ brandId: noBrand?.id, name: noBrand?.name }));
                        navigation.navigate(ASSESSMENT_ROUTE.TAKE_CERTIFICATE);
                    }}
                />
            ) : null}
            {search && dataSearch ? (
                <StyledList
                    data={dataSearch}
                    renderItem={renderSearch}
                    customStyle={styles.viewListSearch}
                    ListEmptyComponent={renderNoData}
                    onScrollBeginDrag={dismissKeyboard}
                />
            ) : (
                <StyledAlphabetSectionList
                    keyGroup="name"
                    sections={dataBrand}
                    renderItem={renderBrand}
                    customStyle={styles.listBrand}
                    onScrollBeginDrag={dismissKeyboard}
                    noDataText={''}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    viewSearch: {
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.assessment.colorSearch,
        borderRadius: 10,
        marginHorizontal: 25,
        marginTop: 10,
        alignItems: 'center',
    },
    iconSearch: {
        width: 15,
        height: 15,
        marginVertical: 10,
        marginLeft: 9,
    },
    inputSearch: {
        marginLeft: 10,
        marginRight: 30,
        fontSize: 14,
        flex: 1,
    },
    listBrand: {
        paddingTop: 15,
    },
    viewListSearch: {
        marginTop: 20,
    },
    itemSearch: {
        borderBottomWidth: 1,
        borderBottomColor: Themes.COLORS.gallery,
    },
    viewNodata: {
        flex: 1,
    },
    noCategory: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 15,
        color: Themes.COLORS.textPrimary,
    },
    buttonShowBill: {
        alignSelf: 'center',
        marginTop: 20,
    },
    bandNotFound: {
        fontSize: 12,
        color: Themes.COLORS.primary,
    },
    textBrandNotExist: {
        marginTop: 20,
        alignSelf: 'flex-end',
        color: Themes.COLORS.assessment.confirm.camera,
        fontSize: 12,
        marginRight: 8,
    },
});

export default BrandCategoryView;
