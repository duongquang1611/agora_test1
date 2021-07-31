import { apiResource } from 'api/resource';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledImage, StyledText, StyledList, StyledAlphabetSectionList } from 'components/base';
import useModal from 'components/base/modal/useModal';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeaderEdit from 'components/common/StyledHeaderEdit';
import { staticValue } from 'feature/staticData';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next/';
import { Keyboard, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { logger } from 'utilities/helper';
import ItemBrandView from '../components/ItemBrandView';

const EditBrandView = ({ categoryId, getBrand }: any) => {
    const { t } = useTranslation();
    const modal = useModal();
    const { brands } = useSelector((state: any) => state.resource);
    const [search, setSearch] = useState<any>();
    const [dataBrand, setDataBrand] = useState<any>([]);
    const [dataSearch, setDataSearch] = useState<any>([]);
    const [dataNoBrand, setDataNoBand] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBrand(null);
        const resultBrand = brands.filter((obj: any) => obj.id > staticValue.ID_NO_BRAND);
        setDataBrand([...resultBrand]);
        setDataNoBand(brands.filter((obj: any) => obj.id === staticValue.ID_NO_BRAND));
    }, []);

    useEffect(() => {
        if (dataBrand.length) {
            setLoading(false);
        }
    }, [dataBrand]);

    useEffect(() => {
        search !== undefined && getListBrands(search);
    }, [search]);

    const getListBrands = useCallback(async (keyword: string) => {
        try {
            const res = await apiResource.getBrands(keyword);
            setDataSearch(res.data || []);
        } catch (error) {
            logger(error);
        }
    }, []);

    const getDataBrand = (data: any) => {
        modal.dismiss();
        getBrand(data);
    };

    const renderBrand = ({ item }: any) => (
        <ItemBrandView name={item?.name} key={item.id} onPress={() => getDataBrand(item)} />
    );

    const renderNoData = () => {
        return (
            <View style={styles.viewNodata}>
                <StyledText i18nText={'brand.noCategory'} customStyle={styles.noCategory} />
            </View>
        );
    };

    const renderSearch = ({ item }: any) => (
        <ItemBrandView
            name={item?.name}
            key={item.id}
            customStyle={styles.itemSearch}
            onPress={() => getDataBrand(item)}
        />
    );

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    return (
        <View style={styles.container}>
            <StyledOverlayLoading visible={loading} />
            <StyledHeaderEdit
                icon={Images.icons.close}
                title={'assessment.titleModalEdit'}
                onPress={() => modal.dismiss()}
            />
            <View style={styles.viewSearch}>
                <StyledImage source={Images.icons.assessment.iconSearch} customStyle={styles.iconSearch} />
                <TextInput
                    value={search}
                    placeholder={t('brand.search')}
                    style={styles.inputSearch}
                    placeholderTextColor={Themes.COLORS.assessment.placeHolderSearch}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            {categoryId === staticValue.TYPE_BRAND_NOT_EXIST && !search && dataSearch && (
                <StyledText
                    i18nText={'assessment.brandNotExist'}
                    customStyle={styles.textBrandNotExist}
                    onPress={() => getDataBrand(dataNoBrand[0])}
                />
            )}
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
                    noDataText={''}
                    onScrollBeginDrag={dismissKeyboard}
                />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        marginTop: '30@vs',
        width: Metrics.screenWidth,
        borderTopLeftRadius: '15@s',
        borderTopRightRadius: '15@s',
    },
    viewSearch: {
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.assessment.colorSearch,
        borderRadius: 10,
        marginHorizontal: 25,
        marginTop: 3,
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
        paddingBottom: 2000,
    },
    itemSearch: {
        borderBottomWidth: 1,
        borderBottomColor: Themes.COLORS.gallery,
    },
    viewNodata: {
        height: Metrics.screenHeight - 50,
        width: '100%',
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

export default EditBrandView;
