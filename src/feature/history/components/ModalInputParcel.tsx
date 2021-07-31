import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledInput, StyledText, StyledTouchable } from 'components/base';
import { staticValue } from 'feature/staticData';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { includeWord } from 'utilities/validate';

const ModalInputParcel = (props: any) => {
    const { onPressClose, handleCloseModal, parcelCode: defaultParcel = '' } = props;
    const [parcelCode, setParcelCode] = useState(defaultParcel);
    const [disabled, setDisabled] = useState(true);
    const onChangeText = (text: string) => {
        setParcelCode(text);
    };
    useEffect(() => {
        setDisabled(parcelCode.trim().length < staticValue.LENGTH_MIN_PARCEL_CODE || includeWord(parcelCode, true));
    }, [parcelCode]);
    return (
        <StyledTouchable onPress={Keyboard.dismiss} customStyle={styles.modalContainer}>
            <StyledTouchable onPress={onPressClose} customStyle={styles.modalClose}>
                <StyledIcon source={Images.icons.close} size={17} />
            </StyledTouchable>
            <View style={styles.modalContent}>
                <StyledText i18nText="transactionHistoryDetail.modalTitle" customStyle={styles.modalTitle} />
                <StyledInput
                    customPlaceHolder="history.codePlaceholder"
                    containerStyle={[
                        styles.containerInput,
                        { borderColor: Themes.COLORS[disabled && !!parcelCode ? 'borderInputError' : 'boulder'] },
                    ]}
                    textAlign="center"
                    keyboardType="number-pad"
                    showClear={true}
                    autoFocus={true}
                    customStyleIncludeError={styles.inputWithError}
                    value={parcelCode}
                    onChangeText={onChangeText}
                    maxLength={staticValue.LENGTH_MAX_PARCEL_CODE}
                    errorMessage={disabled ? 'transactionHistoryDetail.errorParcel' : ''}
                    customTextError={styles.textErrorCode}
                    customStyle={styles.inputStyle}
                />
                <StyledButton
                    onPress={() => handleCloseModal(parcelCode)}
                    title="button.done"
                    customStyle={styles.modalButton}
                    disabled={disabled}
                />
            </View>
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    containerInput: {
        borderWidth: 1,
        borderRadius: 1,
        height: '50@vs',
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        width: '187@s',
        alignSelf: 'center',
    },
    inputStyle: {
        fontSize: '16@ms',
        fontWeight: '300',
    },
    inputWithError: {
        marginVertical: '12@vs',
    },
    modalContent: {
        backgroundColor: Themes.COLORS.white,
        paddingVertical: 55,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
    },
    modalButton: {
        marginTop: 20,
        width: '100%',
    },
    modalTitle: {
        marginBottom: 20,
    },
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth - 40,
    },
    modalClose: {
        alignSelf: 'flex-end',
        marginBottom: 15,
    },
    textErrorCode: {
        marginTop: '10@vs',
        color: Themes.COLORS.borderInputError,
        fontSize: '14@ms',
        fontWeight: '300',
        alignSelf: 'center',
    },
});

export default ModalInputParcel;
