import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScaledSheet } from 'react-native-size-matters';
import { formatPhoneNumber } from 'utilities/format';
import { StyledInput } from '.';

interface StyledInputFormatPhoneProps {
    onPressIconSearch?: any;
    onSubmit?: any;
    value?: any;
    onChangeText?(value: string): void;
}

const StyledInputFormatPhone = (props: StyledInputFormatPhoneProps) => {
    const { onSubmit, value = '', onChangeText, ...otherProps } = props;
    const [valueInput, setValueInput] = React.useState<string>(value);
    const onChangeTextFormat = (text: string) => {
        const removeChar = formatPhoneNumber(text, true);
        onChangeText?.(removeChar);
        setValueInput(formatPhoneNumber(removeChar));
    };
    const { t } = useTranslation();
    return (
        <StyledInput
            placeholder={t('(123)000-0000')}
            value={valueInput}
            onChangeText={onChangeTextFormat}
            containerStyle={styles.containerStyleInput}
            customStyle={styles.input}
            onSubmitEditing={onSubmit}
            keyboardType="number-pad"
            showClear={true}
            {...otherProps}
        />
    );
};
const styles = ScaledSheet.create({
    container: {
        marginTop: '10@s',
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '15@s',
    },
    inputContainer: {
        marginHorizontal: '12@s',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        paddingLeft: '10@s',
    },
    value: {
        fontSize: 15,
    },
    input: {
        fontSize: '14@s',
        fontWeight: '400',
    },
    containerStyleInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.primary,
    },
});
export default memo(StyledInputFormatPhone);
