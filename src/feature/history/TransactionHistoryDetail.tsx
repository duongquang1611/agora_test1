import { getTransactionById } from 'api/assessment';
import { saveParcelCode } from 'api/history';
import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { staticValue, TAB_HISTORY_TRANSACTION } from 'feature/staticData';
import { HISTORY_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { convertSecondToMinute } from 'utilities/convert';
import { formatJapanTime, formatMoney, getFinalOffer } from 'utilities/format';
import { logger } from 'utilities/helper';
import DivideTitle from './components/DivideTitle';
import HeaderPage from './components/HeaderPage';
import ItemImageTransaction from './components/ItemImageTransaction';
import ModalInputParcel from './components/ModalInputParcel';

const TransactionHistoryDetail = ({ route }: any) => {
    const { transactionId, autoShowModal = false } = route?.params;
    const modal = useModal();
    const { brands, categories } = useSelector((state: any) => state.resource);
    const [dataTransaction, setDataTransaction] = useState<any>({});
    const { status: statusTransaction, transactionTime = 0, product = {}, offers = [], user = {} } = dataTransaction;
    const [productDetail, setProductDetail] = useState({ nameBrand: '', nameCategory: '', tabIndex: 1 });
    const { t } = useTranslation();
    const { ALL_TRANSACTION_STATUS, TAB_INDEX } = staticValue;
    const finalOffer: any = useMemo(() => getFinalOffer(offers), [offers]);
    useEffect(() => {
        (async () => {
            try {
                const transaction = await getTransactionById(transactionId);
                if (transaction) {
                    setDataTransaction(transaction?.data);
                }
            } catch (err) {
                logger(err);
            }
        })();
    }, []);

    useEffect(() => {
        setProductDetail({
            nameCategory: categories.find((i: any) => i.id === product?.categoryId)?.name,
            nameBrand: brands.find((i: any) => i.id === product?.brandId)?.name,
            tabIndex:
                statusTransaction === ALL_TRANSACTION_STATUS.SUCCESS
                    ? TAB_INDEX.SUCCESS
                    : statusTransaction === ALL_TRANSACTION_STATUS.SENT ||
                      statusTransaction === ALL_TRANSACTION_STATUS.DONE
                    ? TAB_INDEX.SENT
                    : TAB_INDEX.REJECTED,
        });
        if (statusTransaction === ALL_TRANSACTION_STATUS.SUCCESS && autoShowModal) showModal();
    }, [dataTransaction]);

    const dismissModal = () => {
        modal.dismiss(undefined, () => {
            navigate(HISTORY_ROUTE.ROOT, {
                initPage: TAB_HISTORY_TRANSACTION.SENT_DONE,
            });
        });
    };
    const handleCloseModal = async (parcelCode: string) => {
        try {
            await saveParcelCode(parcelCode, dataTransaction?.id);
            modal.dismiss();
            modal.show({
                children: <ModalSuccess onPressIcon={dismissModal} title="transactionHistoryDetail.textModalParcel" />,
                onBackdropPress: dismissModal,
            });
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };
    const showModal = () => {
        modal.show({
            children: (
                <ModalInputParcel
                    onPressClose={() => modal.dismiss()}
                    handleCloseModal={handleCloseModal}
                    parcelCode={dataTransaction?.parcelCode || ''}
                />
            ),
        });
    };
    const timeReview = useMemo(() => convertSecondToMinute(transactionTime), [transactionTime]);

    return (
        <View style={styles.container}>
            <StyledHeader title="transactionHistoryDetail.title" />
            <ScrollView style={styles.content}>
                <HeaderPage
                    tabIndex={productDetail?.tabIndex}
                    status={statusTransaction}
                    onPress={showModal}
                    changeParcelCode={showModal}
                />
                <DivideTitle title="transactionHistoryDetail.dateTime" />
                <View style={styles.divide}>
                    <StyledText originValue={formatJapanTime(dataTransaction?.createdAt)} customStyle={styles.text} />
                    <StyledText
                        i18nText="transactionHistoryDetail.timeMinute"
                        i18nParams={{ timeReview }}
                        customStyle={styles.text}
                    />
                </View>
                <DivideTitle title="transactionHistoryDetail.info" />
                <View style={styles.divide}>
                    <StyledText
                        i18nText="transactionHistoryDetail.category"
                        i18nParams={{ name: productDetail?.nameCategory || '' }}
                        customStyle={styles.text}
                    />
                    <StyledText
                        i18nText="transactionHistoryDetail.brand"
                        i18nParams={{ name: productDetail?.nameBrand || '' }}
                        customStyle={styles.text}
                    />
                    <StyledText
                        i18nText="transactionHistoryDetail.code"
                        i18nParams={{ name: product?.serialNumber || t('common.noHave') }}
                        customStyle={styles.text}
                    />
                    <StyledText
                        i18nText="transactionHistoryDetail.tab2.parcel"
                        i18nParams={{ code: dataTransaction?.parcelCode || t('common.noHave') }}
                        customStyle={styles.text}
                    />
                    {!!product?.images?.[0].URL && !!product?.images?.[1].URL ? (
                        <View style={styles.imageContainer}>
                            <ItemImageTransaction image={product?.images?.[0]} />
                            <ItemImageTransaction image={product?.images?.[1]} />
                        </View>
                    ) : (
                        <View style={styles.imageContainer}>
                            <ItemImageTransaction
                                image={product?.images?.[0]?.URL ? product?.images?.[0] : product?.images?.[1]}
                            />
                        </View>
                    )}
                </View>
                <DivideTitle title="transactionHistoryDetail.price" />
                <View style={styles.divide}>
                    <StyledText
                        i18nText="transactionHistoryDetail.money"
                        i18nParams={{ money: formatMoney(finalOffer?.price || 0) }}
                        customStyle={styles.text}
                    />
                </View>
                <DivideTitle title="transactionHistoryDetail.inCharge" />
                <View style={styles.divide}>
                    <StyledText i18nText={user?.username || 'common.noData'} customStyle={styles.text} />
                </View>
            </ScrollView>
        </View>
    );
};
const styles = ScaledSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 13,
        lineHeight: 20,
    },
    content: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    divide: {
        paddingVertical: 16,
        paddingHorizontal: 28,
    },
    modalInput: {
        flex: 1,
        fontSize: '16@ms',
    },
    modalInputContainer: {
        width: '180@s',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Themes.COLORS.boulder,
        paddingRight: '20@s',
    },
    container: {
        flex: 1,
    },
});
export default TransactionHistoryDetail;
