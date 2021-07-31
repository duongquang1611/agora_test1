import { updateAccountBank } from 'api/account';
import { getProfile } from 'api/modules/api-app/authenticate';
import { updateBlacklist } from 'app-redux/blacklist/actions';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { ACCOUNT_TYPE, NAVIGATE_TYPE, TRANSFER } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { ASSESSMENT_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { goBack, navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { includeWord, validKatakana } from 'utilities/validate';
import ItemInfoTransfer from './components/ItemInfoTransfer';
import ItemInputTransfer from './components/ItemInputTransfer';

const SelectTransfer = ({ route }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { resource, userInfo, blacklist } = useSelector((state: any) => state);
    const { transferTemp } = blacklist;
    const { banks = [] } = resource;
    const { memberBank } = userInfo.user;
    const { LENGTH_ACCOUNT_NUMBER, LENGTH_BRANCH_CODE } = TRANSFER;
    const { navigateFrom = NAVIGATE_TYPE.REQUEST_PAYMENT } = route?.params || {};
    const isFromPayment = navigateFrom === NAVIGATE_TYPE.REQUEST_PAYMENT;
    const isFromVideoChat = navigateFrom === NAVIGATE_TYPE.VIDEO_AND_CHAT;
    const isFromSetting = navigateFrom === NAVIGATE_TYPE.SETTING;
    useBackHandler(() => !isFromSetting);
    const modal = useModal(isFromSetting);
    const initMemberBank = {
        bankId: '',
        accountType: '',
        branchCode: '',
        accountNumber: '',
        accountFullName: '',
        accountFullNameFurigana: '',
    };
    const [transfer, setTransfer] = useState(
        memberBank
            ? {
                  ...initMemberBank,
                  ...memberBank,
              }
            : initMemberBank,
    );
    const { bankId, accountType, branchCode, accountNumber, accountFullName, accountFullNameFurigana } = transfer;
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const accountTypeObj = ACCOUNT_TYPE.filter((item) => item.id === accountType)[0];
    const isErrorKatakana = !validKatakana(accountFullNameFurigana) && !!accountFullNameFurigana;
    const isErrorBranchCode = includeWord(branchCode) || branchCode.length < LENGTH_BRANCH_CODE;
    const isErrorAccountNumber = includeWord(accountNumber) || accountNumber.length < LENGTH_ACCOUNT_NUMBER;

    useEffect(() => {
        transferTemp && setTransfer({ ...transfer, ...transferTemp });
    }, [transferTemp]);

    useEffect(() => {
        const transferCheck = [bankId, accountType || '', accountFullName, accountFullNameFurigana];
        setDisabledBtn(isErrorKatakana || isErrorBranchCode || isErrorAccountNumber || transferCheck.includes(''));
    }, [transfer]);

    const showModal = () => {
        setIsLoading(false);
        modal.show({
            children: <ModalSuccess title={'transfer.select.successChange'} onPressIcon={dismissModal} />,
            onBackdropPress: dismissModal,
        });
    };

    const dismissModal = () => {
        modal.dismiss();
    };

    const onPressNext = async () => {
        Keyboard.dismiss();
        try {
            if (isFromPayment || isFromVideoChat) {
                dispatch(updateBlacklist({ transferTemp: transfer }));
                navigate(ASSESSMENT_ROUTE.CONFIRM_TRANSFER, { navigateFrom });
            } else {
                const newMemberBank = { ...transfer };
                setIsLoading(true);
                if (newMemberBank?.id) {
                    delete newMemberBank.id;
                }
                await updateAccountBank(newMemberBank);
                const response = await getProfile();
                dispatch(setUserInfo({ ...userInfo, user: response?.data }));
                showModal();
            }
        } catch (error) {
            isLoading && setIsLoading(false);
            logger(error);
            AlertMessage(error);
        }
    };

    const selectBank = () => {
        navigate(ASSESSMENT_ROUTE.SELECT_BANK, { setTransfer, transfer });
    };

    const selectAccountType = () => {
        navigate(ASSESSMENT_ROUTE.SELECT_ACCOUNT_TYPE, { setTransfer, transfer });
    };

    const changeTransfer = (field: string, value = '') => {
        setTransfer({
            ...transfer,
            [field]: value,
        });
    };

    return (
        <>
            <StyledOverlayLoading visible={isLoading} />
            <StyledHeader
                title="transfer.select.title"
                onPressBack={() => {
                    navigateFrom === NAVIGATE_TYPE.VIDEO_AND_CHAT
                        ? navigate(TAB_NAVIGATION_ROOT.HISTORY_ROUTE.ROOT)
                        : goBack();
                }}
                hasBack={isFromSetting}
            />
            <ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
                <ItemInfoTransfer
                    title="transfer.select.bank"
                    label="transfer.select.pleaseSelect"
                    value={banks.find((bank: any) => bank.id === bankId)?.name}
                    hasArrow={true}
                    onPress={selectBank}
                />
                <ItemInfoTransfer
                    title="transfer.select.accountType"
                    label="transfer.select.pleaseSelect"
                    value={accountTypeObj?.name}
                    hasArrow={true}
                    onPress={selectAccountType}
                />
                <ItemInputTransfer
                    title="transfer.select.branchCode"
                    placeholder={t('transfer.select.hintDigit', { number: LENGTH_BRANCH_CODE })}
                    value={branchCode}
                    onChangeText={(text: string) => changeTransfer('branchCode', text)}
                    maxLength={LENGTH_BRANCH_CODE}
                    keyboardType="number-pad"
                />
                <ItemInputTransfer
                    title="transfer.select.accountNumber"
                    placeholder={t('transfer.select.hintDigit', { number: LENGTH_ACCOUNT_NUMBER })}
                    value={accountNumber}
                    onChangeText={(text: string) => changeTransfer('accountNumber', text)}
                    maxLength={LENGTH_ACCOUNT_NUMBER}
                    keyboardType="number-pad"
                />
                <ItemInputTransfer
                    title="transfer.select.accountFullName"
                    customPlaceHolder={'transfer.select.hintAccountFullName'}
                    value={accountFullName}
                    onChangeText={(text: string) => changeTransfer('accountFullName', text)}
                />
                <ItemInputTransfer
                    title="transfer.select.accountFullNameFurigana"
                    customPlaceHolder={'transfer.select.hintAccountFullNameFurigana'}
                    value={accountFullNameFurigana}
                    onChangeText={(text: string) => changeTransfer('accountFullNameFurigana', text)}
                />
                {isErrorKatakana && (
                    <StyledText i18nText={'changeAddress.requireKatakana'} customStyle={styles.textErrorCode} />
                )}
                <View style={styles.noteContainer}>
                    <StyledText i18nText={'transfer.select.note'} customStyle={styles.textNote} />
                </View>
                <StyledButton
                    title={
                        isFromPayment || isFromVideoChat
                            ? 'transfer.select.next'
                            : 'transfer.select.confirmChangeTransfer'
                    }
                    onPress={onPressNext}
                    customStyle={styles.btnNext}
                    disabled={disabledBtn}
                />
            </ScrollView>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    btnNext: {
        marginTop: '40@vs',
    },
    noteContainer: {
        marginLeft: '20@s',
        marginRight: '15@s',
        paddingVertical: '15@vs',
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.gallery,
    },
    textNote: {
        fontSize: '11@ms',
        lineHeight: '16.5@vs',
        fontWeight: '300',
        color: Themes.COLORS.assessment.textNoteColor,
    },
    textErrorCode: {
        marginTop: '10@vs',
        color: Themes.COLORS.profile.textError,
        fontSize: '12@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        alignSelf: 'flex-end',
        marginRight: '8@s',
    },
});

export default SelectTransfer;
