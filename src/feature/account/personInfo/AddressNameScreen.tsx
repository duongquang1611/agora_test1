/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateAddress } from 'api/account';
import { getProfile } from 'api/modules/api-app/authenticate';
import { apiResource } from 'api/resource';
import { updateBlacklist } from 'app-redux/blacklist/actions';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledPicker from 'components/base/picker/StyledPicker';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import ModalSuccess from 'components/ModalSuccess';
import { NAVIGATE_TYPE, POSTAL_CODE, staticValue } from 'feature/staticData';
import { Formik } from 'formik';
import useBackHandler from 'hooks/useBackHandler';
import { ACCOUNT_ROUTE, ASSESSMENT_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { formatPostCode } from 'utilities/format';
import { isIos, logger } from 'utilities/helper';
import { regexKatakana, regexNotNum } from 'utilities/validate';
import * as yup from 'yup';
import BlockInputInfoView from '../components/BlockInputInfoView';

const AddressNameScreen = ({ route }: any) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { REQUEST_PAYMENT, SETTING, VIDEO_AND_CHAT } = NAVIGATE_TYPE;
    const { navigateFrom = REQUEST_PAYMENT } = route?.params || {};
    const isFromSetting = navigateFrom === SETTING;
    const isFromVideoChat = navigateFrom === VIDEO_AND_CHAT;
    useBackHandler(() => !isFromSetting);
    const modal = useModal(isFromSetting);
    const { userInfo, resource, blacklist } = useSelector((state: any) => state);
    const { addressTemp = {} } = blacklist;
    const [showErrorCode, setShowErrorCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = userInfo;
    const { kens, cities } = resource;
    const initAddress = {
        postCode: user?.postCode || '',
        kenId: user?.kenId || '',
        cityName: user?.cityName || '',
        address: user?.address || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        firstNameFurigana: user?.firstNameFurigana || '',
        lastNameFurigana: user?.lastNameFurigana || '',
    };
    const [addressData, setAddressData] = useState({ ...initAddress, ...addressTemp });
    const {
        postCode,
        kenId,
        cityName,
        address,
        firstName,
        lastName,
        firstNameFurigana,
        lastNameFurigana,
    } = addressData;
    const { LENGTH_START_POSTAL_CODE, LENGTH_END_POSTAL_CODE } = staticValue;
    const { start: startPostalCode = '', end: endPostalCode = '' } = formatPostCode(postCode);
    const [startCode, setStartCode] = useState<string>(startPostalCode);
    const [endCode, setEndCode] = useState<string>(endPostalCode);
    const [heightAddress, setHeightAddress] = useState(45);
    const refForm: any = [];
    const validateInputSchema = yup.object().shape({
        startPostalCode: yup
            .string()
            .required()
            .test('len', (val: any) => (val ? val.length === LENGTH_START_POSTAL_CODE : val)),
        endPostalCode: yup
            .string()
            .required()
            .test('len', (val: any) => (val ? val.length >= LENGTH_END_POSTAL_CODE : val)),
        kenName: yup.string().required(),
        cityName: yup.string().required(),
        address: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        firstNameFurigana: yup.string().required().matches(regexKatakana, t('changeAddress.requireKatakana')),
        lastNameFurigana: yup.string().required().matches(regexKatakana, t('changeAddress.requireKatakana')),
    });

    const checkPostalCode = () => {
        if (startCode?.length < LENGTH_START_POSTAL_CODE || endCode?.length < LENGTH_END_POSTAL_CODE) {
            setShowErrorCode(true);
            return false;
        }
        return true;
    };

    const deleteKey = (obj = {}) => {
        const newObj: any = { ...obj };
        const keys = ['kenName', 'startPostalCode', 'endPostalCode'];
        keys.forEach((key: string) => delete newObj?.[key]);
        return newObj;
    };

    const submitNext = async (values: any) => {
        let newData = {
            ...values,
            kenId: kens.find((ken: any) => ken.name === values.kenName)?.id,
            postCode: `${values.startPostalCode}-${values.endPostalCode}`,
        };
        newData = deleteKey(newData);
        if (isFromSetting) {
            setIsLoading(true);
            try {
                await updateAddress(newData);
                const response = await getProfile();
                dispatch(setUserInfo({ ...userInfo, user: response?.data }));
                modal.show({
                    children: <ModalSuccess title={'changeAddress.success'} onPressIcon={() => modal.dismiss()} />,
                    onBackdropPress: () => modal.dismiss(),
                });
            } catch (error) {
                logger(error);
                AlertMessage(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            dispatch(updateBlacklist({ addressTemp: newData }));
            navigate(isFromVideoChat ? ACCOUNT_ROUTE.CHANGE_ID_MENU : ASSESSMENT_ROUTE.CONFIRM_TRANSFER, {
                navigateFrom,
            });
        }
    };

    const focusField = (fieldName: string) => {
        refForm[fieldName]?.focus();
    };

    const completePostalCode = async (setFieldValue: any) => {
        if (checkPostalCode()) {
            try {
                setIsLoading(true);
                const response = await apiResource.getAddressByPostCode({ code: `${startCode}-${endCode}` });
                const { kenId: kenIdFill = '', cityName: cityNameFill = '', address: addressFill = '' } =
                    response?.data || {};
                const fullSecondAddress = cityNameFill + (addressFill ? addressFill : '');
                setFieldValue('cityName', fullSecondAddress);
                setFieldValue('kenName', kens.find((ken: any) => ken.id === kenIdFill)?.name);
            } catch (error) {
                AlertMessage(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onChangeStartCode = (text: string, setFieldValue: any) => {
        const textValid = text.replace(regexNotNum, '');
        if (textValid?.length === LENGTH_START_POSTAL_CODE) {
            focusField('endPostalCode');
        }
        showErrorCode && setShowErrorCode(false);
        setFieldValue('startPostalCode', textValid);
        setStartCode(textValid);
    };

    const onChangeEndCode = (text: string, setFieldValue: any) => {
        const textValid = text.replace(regexNotNum, '');
        showErrorCode && setShowErrorCode(false);
        setFieldValue('endPostalCode', textValid);
        setEndCode(textValid);
    };

    const onChangeKen = (text: string, values: any, setFieldValue: any) => {
        setFieldValue('kenName', text);
        if (values.kenName !== text) setFieldValue('cityName', '');
    };

    const pressKeyEndCode = ({ nativeEvent: { key: keyValue } }: any) => {
        if (keyValue === 'Backspace' && endCode?.length === 1) {
            focusField('startPostalCode');
        }
    };

    const onFocusCode = () => {
        showErrorCode && setShowErrorCode(false);
    };

    const setRef = (fieldName: string, ref: any) => {
        refForm[fieldName] = ref;
    };

    const updateHeightAddress = useCallback((height: number) => {
        setHeightAddress(height < heightAddress ? heightAddress : height + (isIos ? 25 : 10));
    }, []);

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    return (
        <View style={styles.flex1}>
            <StyledHeader title={'profile.title'} hasBack={isFromSetting} />
            {isLoading && <StyledOverlayLoading visible={isLoading} />}
            <Formik
                validationSchema={validateInputSchema}
                initialValues={{
                    startPostalCode,
                    endPostalCode,
                    kenName: kens.find((ken: any) => ken.id === kenId)?.name,
                    cityName,
                    address,
                    firstName,
                    lastName,
                    firstNameFurigana,
                    lastNameFurigana,
                }}
                onSubmit={(values: any) => {
                    try {
                        submitNext(values);
                    } catch (err) {
                        logger(err);
                    }
                }}
                validateOnMount={true}
            >
                {({ handleChange, handleSubmit, values, isValid, setFieldValue, errors }: any) => {
                    return (
                        <>
                            <View style={styles.flex1}>
                                <KeyboardAwareScrollView
                                    keyboardShouldPersistTaps="handled"
                                    style={styles.container}
                                    enableOnAndroid={true}
                                    enableAutomaticScroll={isIos}
                                    showsVerticalScrollIndicator={false}
                                    onScrollBeginDrag={dismissKeyboard}
                                >
                                    <BlockInputInfoView title={'profile.address'}>
                                        <StyledText customStyle={styles.labelInput} i18nText={'profile.postalCode'} />
                                        <View style={styles.containerPostalCode}>
                                            <StyledInput
                                                ref={(ref) => setRef('startPostalCode', ref)}
                                                value={values.startPostalCode}
                                                onChangeText={(text) => onChangeStartCode(text, setFieldValue)}
                                                customStyleIncludeError={styles.startCodeContainer}
                                                containerStyle={[
                                                    styles.containerInput,
                                                    {
                                                        borderColor: showErrorCode
                                                            ? Themes.COLORS.profile.textError
                                                            : Themes.COLORS.profile.inputBorder,
                                                    },
                                                ]}
                                                customStyle={[styles.textInput, styles.nonPadding]}
                                                placeholder={POSTAL_CODE.start}
                                                keyboardType={'number-pad'}
                                                maxLength={LENGTH_START_POSTAL_CODE}
                                                textAlign={'center'}
                                                onFocus={onFocusCode}
                                                onSubmitEditing={() => focusField('endPostalCode')}
                                            />
                                            <View
                                                style={[
                                                    styles.separatorCode,
                                                    {
                                                        backgroundColor: showErrorCode
                                                            ? Themes.COLORS.profile.textError
                                                            : Themes.COLORS.profile.inputBorder,
                                                    },
                                                ]}
                                            />
                                            <StyledInput
                                                ref={(ref) => setRef('endPostalCode', ref)}
                                                value={values.endPostalCode}
                                                onChangeText={(text) => onChangeEndCode(text, setFieldValue)}
                                                customStyleIncludeError={styles.endCodeContainer}
                                                containerStyle={[
                                                    styles.containerInput,
                                                    {
                                                        borderColor: showErrorCode
                                                            ? Themes.COLORS.profile.textError
                                                            : Themes.COLORS.profile.inputBorder,
                                                    },
                                                ]}
                                                customStyle={[styles.textInput, styles.nonPadding]}
                                                placeholder={POSTAL_CODE.end}
                                                keyboardType={'number-pad'}
                                                maxLength={LENGTH_END_POSTAL_CODE}
                                                textAlign={'center'}
                                                onKeyPress={pressKeyEndCode}
                                                onFocus={onFocusCode}
                                            />
                                            <StyledButton
                                                isOutlineButton={true}
                                                title={'profile.autoComplete'}
                                                customStyle={styles.btnPostalCode}
                                                onPress={() => completePostalCode(setFieldValue)}
                                                customTitleStyle={styles.textBtnPostal}
                                            />
                                        </View>
                                        {showErrorCode && (
                                            <StyledText
                                                i18nText={'profile.errorPostalCode'}
                                                customStyle={styles.textErrorCode}
                                            />
                                        )}
                                        <StyledText customStyle={styles.labelInput} i18nText={'profile.ken'} />
                                        <StyledPicker
                                            dataList={kens.map((item: any) => item.name)}
                                            label={'profile.hintKen'}
                                            titleModalShowUp={'profile.hintKen'}
                                            customLabelStyle={styles.labelPickerStyle}
                                            onConfirm={(text) => onChangeKen(text, values, setFieldValue)}
                                            currentValue={values.kenName}
                                            customStyle={[styles.containerInput, { paddingHorizontal: 10 }]}
                                        />
                                        <StyledText customStyle={styles.labelInput} i18nText={'profile.city'} />
                                        <StyledInput
                                            ref={(ref) => setRef('cityName', ref)}
                                            value={values.cityName}
                                            onChangeText={handleChange('cityName')}
                                            containerStyle={styles.containerInput}
                                            customStyle={styles.textInput}
                                            customPlaceHolder={'profile.hintCity'}
                                            onSubmitEditing={() => focusField('address')}
                                        />
                                        <StyledText
                                            customStyle={styles.labelInput}
                                            i18nText={'profile.addressDetail'}
                                        />
                                        <StyledInput
                                            ref={(ref) => setRef('address', ref)}
                                            value={values.address}
                                            onChangeText={handleChange('address')}
                                            containerStyle={[styles.containerInput, { height: heightAddress }]}
                                            customStyle={[
                                                styles.textInputAddress,
                                                { marginTop: isIos ? verticalScale(3) : 0 },
                                            ]}
                                            maxLength={staticValue.LENGTH_ADDRESS}
                                            customPlaceHolder={'profile.hintAddressDetail'}
                                            onSubmitEditing={() => focusField('firstName')}
                                            multiline={true}
                                            onContentSizeChange={(e) =>
                                                updateHeightAddress(e.nativeEvent.contentSize.height)
                                            }
                                        />
                                    </BlockInputInfoView>
                                    <BlockInputInfoView title={'profile.fullName'}>
                                        <View style={styles.containerFullName}>
                                            <StyledInput
                                                ref={(ref) => setRef('firstName', ref)}
                                                value={values.firstName}
                                                onChangeText={handleChange('firstName')}
                                                customStyleIncludeError={styles.inputTwoColumnView}
                                                containerStyle={[styles.containerInput]}
                                                customStyle={styles.textInput}
                                                customPlaceHolder={'profile.hintFirstName'}
                                                onSubmitEditing={() => focusField('lastName')}
                                            />
                                            <StyledInput
                                                ref={(ref) => setRef('lastName', ref)}
                                                value={values.lastName}
                                                onChangeText={handleChange('lastName')}
                                                customStyleIncludeError={styles.inputTwoColumnView}
                                                containerStyle={[styles.containerInput]}
                                                customStyle={styles.textInput}
                                                customPlaceHolder={'profile.hintLastName'}
                                                onSubmitEditing={() => focusField('firstNameFurigana')}
                                            />
                                        </View>
                                    </BlockInputInfoView>
                                    <BlockInputInfoView title={'profile.fullNameFurigana'}>
                                        <View style={styles.containerSpelling}>
                                            <StyledInput
                                                ref={(ref) => setRef('firstNameFurigana', ref)}
                                                value={values.firstNameFurigana}
                                                onChangeText={handleChange('firstNameFurigana')}
                                                customStyleIncludeError={styles.inputTwoColumnView}
                                                containerStyle={[styles.containerInput]}
                                                customStyle={styles.textInput}
                                                customPlaceHolder={'profile.hintFirstNameFurigana'}
                                                onSubmitEditing={() => focusField('lastNameFurigana')}
                                            />
                                            <StyledInput
                                                ref={(ref) => setRef('lastNameFurigana', ref)}
                                                value={values.lastNameFurigana}
                                                onChangeText={handleChange('lastNameFurigana')}
                                                customStyleIncludeError={styles.inputTwoColumnView}
                                                containerStyle={[styles.containerInput]}
                                                customStyle={styles.textInput}
                                                customPlaceHolder={'profile.hintLastNameFurigana'}
                                                returnKeyType={'done'}
                                                onSubmitEditing={dismissKeyboard}
                                            />
                                        </View>
                                        {(errors?.firstNameFurigana === t('changeAddress.requireKatakana') ||
                                            errors?.lastNameFurigana === t('changeAddress.requireKatakana')) && (
                                            <StyledText
                                                i18nText={'changeAddress.requireKatakana'}
                                                customStyle={styles.textErrorCode}
                                            />
                                        )}
                                    </BlockInputInfoView>
                                    <StyledButton
                                        title={isFromVideoChat ? 'profile.next' : 'profile.confirmChange'}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                    />
                                </KeyboardAwareScrollView>
                            </View>
                        </>
                    );
                }}
            </Formik>
        </View>
    );
};

const styles = ScaledSheet.create({
    flex1: {
        flex: 1,
    },
    container: {},
    labelInput: {
        fontSize: '12@ms',
        fontWeight: '300',
        marginBottom: '6@vs',
        marginTop: '20@vs',
    },
    containerInput: {
        borderWidth: 1,
        borderRadius: 1,
        borderColor: Themes.COLORS.profile.inputBorder,
        height: '45@vs',
        backgroundColor: Themes.COLORS.white,
        alignItems: 'flex-start',
    },
    containerPostalCode: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    startCodeContainer: {
        flex: 1.2,
    },
    endCodeContainer: {
        flex: 1.5,
    },
    separatorCode: {
        width: 10,
        height: 1,
        backgroundColor: Themes.COLORS.profile.inputBorder,
        marginHorizontal: '5@s',
    },
    btnPostalCode: {
        borderWidth: 1,
        borderRadius: 1,
        height: '45@vs',
        flex: 2,
        marginLeft: '10@s',
    },
    textInput: {
        fontSize: '14@ms',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
    },
    textInputAddress: {
        fontSize: '14@ms',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        lineHeight: '23@vs',
    },
    nonPadding: {
        paddingRight: 0,
        paddingLeft: 0,
    },
    textBtnPostal: {
        fontSize: '14@ms',
        fontWeight: '300',
    },
    containerFullName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '15@vs',
    },
    containerSpelling: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '15@vs',
    },
    inputTwoColumnView: {
        width: '49%',
    },
    labelPickerStyle: {
        color: Themes.COLORS.placeHolderGray,
    },
    textErrorCode: {
        marginTop: '10@vs',
        color: Themes.COLORS.profile.textError,
        fontSize: '12@ms',
        fontWeight: '300',
    },
    textError: {
        marginTop: '8@vs',
        color: Themes.COLORS.profile.textError,
        fontSize: '14@ms',
        fontWeight: '300',
        marginHorizontal: 5,
    },
});

export default AddressNameScreen;
