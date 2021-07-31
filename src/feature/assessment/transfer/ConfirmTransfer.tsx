import { updateAccountBank, updateAddress } from 'api/account';
import { getProfile } from 'api/modules/api-app/authenticate';
import { claimPayment } from 'api/offer';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { ACCOUNT_TYPE, NAVIGATE_TYPE, staticValue } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate, push } from 'navigation/NavigationService';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { joinArr } from 'utilities/convert';
import { formatMoney, formatPostCode } from 'utilities/format';
import { logger } from 'utilities/helper';
import ItemTransferConfirm from './components/ItemTransferConfirm';

const ConfirmTransfer = ({ route }: any) => {
    const dispatch = useDispatch();
    const { userInfo, resource, blacklist } = useSelector((state: any) => state);
    const { user } = userInfo;
    const { kens, banks } = resource;
    const { addressTemp, transferTemp, dataOffer } = blacklist;
    const { memberBank } = userInfo.user;
    const [disabled, setDisabled] = useState(true);
    useBackHandler();
    const {
        bankId = '',
        accountType = '',
        branchCode = '',
        accountNumber = '',
        accountFullName = '',
        accountFullNameFurigana = '',
    } = transferTemp || memberBank || {};
    const {
        postCode = '',
        kenId = '',
        cityName = '',
        address = '',
        lastName = '',
        firstName = '',
        firstNameFurigana = '',
        lastNameFurigana = '',
    } = addressTemp || user;
    const bankName = useMemo(() => banks.find((item: any) => item.id === bankId)?.name || '', [bankId]);
    const accountTypeName = useMemo(() => ACCOUNT_TYPE.find((item: any) => item.id === accountType)?.name || '', [
        accountType,
    ]);
    const kenName = useMemo(() => kens.find((item: any) => item.id === kenId)?.name || '', [kenId]);
    const [loading, setLoading] = useState(false);
    const { VIDEO_AND_CHAT, REQUEST_PAYMENT, SETTING } = NAVIGATE_TYPE;
    const { navigateFrom = VIDEO_AND_CHAT } = route?.params || {};
    const isFromSetting = navigateFrom === SETTING;

    const allData = [
        postCode,
        kenId,
        cityName,
        address,
        lastName,
        firstName,
        firstNameFurigana,
        lastNameFurigana,
        bankId,
        accountType,
        branchCode,
        accountNumber,
        accountFullName,
        accountFullNameFurigana,
    ];

    useEffect(() => {
        setDisabled(allData.includes(''));
    }, [allData]);

    const selectTransfer = () => {
        push(ASSESSMENT_ROUTE.SELECT_TRANSFER, { navigateFrom: REQUEST_PAYMENT });
    };
    const changeAddress = () => {
        push(ACCOUNT_ROUTE.ADDRESS, {
            navigateFrom: REQUEST_PAYMENT,
        });
    };
    const requestPayment = async () => {
        const dataAddress = {
            postCode,
            kenId,
            cityName,
            address,
            lastName,
            firstName,
            firstNameFurigana,
            lastNameFurigana,
        };
        setLoading(true);
        try {
            const newMemberBank = transferTemp ? { ...transferTemp } : { ...memberBank };
            if (newMemberBank?.id) {
                delete newMemberBank.id;
            }
            await Promise.all([
                updateAccountBank(newMemberBank),
                updateAddress(dataAddress),
                claimPayment(dataOffer?.id),
            ]);
            const response = await getProfile();
            dispatch(setUserInfo({ ...userInfo, user: response?.data }));
            navigate(TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.COMPLETE_TRANSFER);
        } catch (error) {
            logger(error);
            AlertMessage(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <StyledHeader
                title={'transfer.confirm.title'}
                onPressBack={() => {
                    navigateFrom === VIDEO_AND_CHAT ? navigate(TAB_NAVIGATION_ROOT.HISTORY_ROUTE.ROOT) : goBack();
                }}
                hasBack={isFromSetting}
            />
            <StyledOverlayLoading visible={loading} />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.containerTextConfirm}>
                    <StyledText i18nText={'transfer.confirm.textConfirm'} customStyle={styles.textConfirm} />
                </View>
                <ItemTransferConfirm
                    textBtn={'transfer.confirm.change'}
                    title="transfer.confirm.destination"
                    onPress={selectTransfer}
                >
                    <View>
                        <StyledText i18nText={joinArr([bankName, accountTypeName])} customStyle={styles.contentText} />
                        <StyledText
                            i18nText={'transfer.confirm.branchCode'}
                            i18nParams={{ branchCode }}
                            customStyle={styles.contentText}
                        />
                        <StyledText
                            i18nText={'transfer.confirm.accountNumber'}
                            i18nParams={{ accountNumber }}
                            customStyle={styles.contentText}
                        />
                        <StyledText
                            i18nText={'transfer.confirm.accountName'}
                            i18nParams={{ accountName: `${accountFullName}` }}
                            customStyle={styles.contentText}
                        />
                        <StyledText
                            i18nText={'transfer.confirm.accountNameFurigana'}
                            i18nParams={{ accountName: `${accountFullNameFurigana}` }}
                            customStyle={styles.contentText}
                        />
                    </View>
                </ItemTransferConfirm>
                <ItemTransferConfirm
                    textBtn={'transfer.confirm.change'}
                    title="transfer.confirm.address"
                    onPress={changeAddress}
                >
                    <View>
                        <StyledText
                            i18nText={formatPostCode(postCode)?.format || ''}
                            customStyle={styles.contentText}
                        />
                        <StyledText i18nText={joinArr([kenName, cityName, address])} customStyle={styles.contentText} />
                        <StyledText i18nText={joinArr([firstName, lastName])} customStyle={styles.contentText} />
                        <StyledText
                            i18nText={joinArr([firstNameFurigana, lastNameFurigana])}
                            numberOfLines={3}
                            customStyle={styles.contentText}
                        />
                    </View>
                </ItemTransferConfirm>
                <StyledText i18nText={'transfer.confirm.paymentAmount'} customStyle={styles.textNotifyAmount} />
                <View style={styles.amountContainer}>
                    <StyledText originValue={formatMoney(dataOffer?.price || 0)} customStyle={styles.amountText} />
                    <StyledText i18nText={` ${staticValue.CURRENCY}`} customStyle={styles.textCurrency} />
                </View>
                <StyledButton
                    disabled={disabled}
                    title="transfer.confirm.completePayment"
                    onPress={requestPayment}
                    customStyle={styles.btnConfirm}
                />
            </ScrollView>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '25@s',
        alignItems: 'center',
    },
    containerTextConfirm: {
        paddingVertical: '36@vs',
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.assessment.confirmTransfer.separatorColor,
    },
    textConfirm: {
        fontSize: '15@ms',
        fontWeight: '300',
    },
    contentText: {
        fontSize: '15@ms',
        fontWeight: '300',
        marginBottom: 2,
    },
    blockBankView: {
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.assessment.confirmTransfer.separatorColor,
    },
    btnConfirm: {
        marginTop: '50@vs',
        marginBottom: '97@vs',
    },
    textNotifyAmount: {
        marginTop: '50@vs',
        fontSize: '15@ms',
        fontWeight: '300',
        textAlign: 'center',
    },
    amountText: {
        fontSize: '32@ms',
        fontWeight: '600',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textCurrency: {
        fontSize: '12@ms',
        fontWeight: '300',
        color: Themes.COLORS.black,
        marginBottom: '8@ms',
    },
});

export default ConfirmTransfer;
