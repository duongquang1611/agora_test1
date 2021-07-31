import { updateAddress } from 'api/account';
import { updateCommon } from 'app-redux/common/actions';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledList, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { APP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'utilities/logger';
import ItemProvince from './components/ItemProvince';

const SelectProvince = () => {
    const { resource, userInfo } = useSelector((state: any) => state);
    const { kens = [] } = resource;
    const [selected, setSelected] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const renderItemProvince = ({ item }: any) => {
        return <ItemProvince {...{ setSelected, selected, item }} />;
    };
    const selectProvince = async () => {
        setIsLoading(true);
        try {
            await updateAddress({ kenId: selected });
            dispatch(updateCommon({ selectedKen: true }));
            dispatch(setUserInfo({ ...userInfo, user: { ...userInfo?.user, kenId: selected } }));
            setIsLoading(false);
            navigate(APP_ROUTE.MAIN_TAB);
        } catch (error) {
            setIsLoading(false);
            logger(error);
            AlertMessage(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StyledOverlayLoading visible={isLoading} />
            <StyledText i18nText="provinceView.title" customStyle={styles.title} />
            <StyledList
                data={kens}
                renderItem={renderItemProvince}
                customStyle={styles.listProvince}
                refreshControl={null}
            />
            <View style={styles.btnStartContainer}>
                <StyledButton
                    title="provinceView.start"
                    onPress={selectProvince}
                    customStyle={styles.btnStart}
                    disabled={selected === undefined}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '40@s',
        marginTop: '120@vs',
        backgroundColor: Themes.COLORS.white,
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    title: {
        fontSize: '19@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
        marginBottom: '30@vs',
    },
    btnStartContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.white,
        height: '80@vs',
    },
    btnStart: {
        marginTop: '10@vs',
    },
    listProvince: {
        paddingBottom: '100@vs',
    },
});

export default SelectProvince;
