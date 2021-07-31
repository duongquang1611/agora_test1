import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledAlphabetSectionList, StyledImage, StyledList } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { goBack } from 'navigation/NavigationService';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, PixelRatio, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { verticalScale } from 'react-native-size-matters';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { staticValue } from 'feature/staticData';
import { formatGroupBank } from 'utilities/format';
import { isIos, logger } from 'utilities/helper';
import { apiResource } from 'api/resource';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import ItemBank from './components/ItemBank';

const SelectBank = ({ route }: any) => {
    const { t } = useTranslation();
    const { setTransfer, transfer } = route.params;
    const { resource } = useSelector((state: any) => state);
    const { banks = [] } = resource;
    const [search, setSearch] = useState<any>();
    const [dataSearch, setDataSearch] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const groupBanksOrdered = useMemo(() => formatGroupBank(banks), [banks]);

    useEffect(() => {
        !isIos && AndroidKeyboardAdjust.setAdjustPan();
        setTimeout(() => {
            setIsLoading(false);
        }, staticValue.ONE_SECOND);
        return () => {
            !isIos && AndroidKeyboardAdjust.setAdjustResize();
        };
    }, []);

    useEffect(() => {
        search !== undefined && getListBanks(search);
    }, [search]);

    const getListBanks = useCallback(async (keyword: string) => {
        try {
            const res = await apiResource.getBanks(keyword);
            setDataSearch(res.data || []);
        } catch (error) {
            logger(error);
        }
    }, []);

    const getItemLayout = sectionListGetItemLayout({
        getItemHeight: () => {
            return verticalScale(50);
        },
        getSeparatorHeight: () => 1 / PixelRatio.get(),
        getSectionHeaderHeight: () => verticalScale(40),
        getSectionFooterHeight: () => 0,
        listHeaderHeight: verticalScale(40),
    });

    const renderBank = ({ item }: any) => {
        return <ItemBank item={item} key={item.id} onPress={handleSelectBank} />;
    };

    const handleSelectBank = (item: any) => {
        setTransfer({ ...transfer, bankId: item?.id });
        goBack();
    };

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    return (
        <View style={styles.container}>
            <StyledOverlayLoading visible={isLoading} />
            <StyledHeader title={'transfer.bank.title'} hasBorderBottom={false} />
            <View style={styles.viewSearch}>
                <StyledImage source={Images.icons.assessment.iconSearch} customStyle={styles.iconSearch} />
                <TextInput
                    value={search}
                    placeholder={t('transfer.bank.placeholderSearch')}
                    style={styles.inputSearch}
                    placeholderTextColor={Themes.COLORS.assessment.placeHolderSearch}
                    onChangeText={setSearch}
                />
            </View>
            {search && dataSearch ? (
                <StyledList
                    data={dataSearch}
                    renderItem={renderBank}
                    customStyle={styles.viewListSearch}
                    noDataStyleContainerText={styles.noData}
                    onScrollBeginDrag={dismissKeyboard}
                />
            ) : (
                <StyledAlphabetSectionList
                    keyGroup="name"
                    sections={search ? dataSearch : groupBanksOrdered}
                    renderItem={renderBank}
                    initialNumToRender={banks.length}
                    customStyle={styles.listBank}
                    isGrouped={true}
                    getItemLayout={getItemLayout}
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
        marginHorizontal: 15,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 15,
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
    listBank: {},
    viewListSearch: {
        marginTop: 20,
        paddingBottom: 30,
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
    noData: {
        justifyContent: 'flex-start',
    },
});

export default SelectBank;
