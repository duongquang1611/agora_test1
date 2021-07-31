import React, { memo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { useTranslation } from 'react-i18next';
import { StyledInput } from '.';

interface StyledSearchInputProps {
    searchData: any;
    setSearchData: any;
    onPressIconSearch?: any;
    onSubmit?: any;
}

const StyledSearchInput = (props: StyledSearchInputProps) => {
    const { searchData, setSearchData, onPressIconSearch, onSubmit } = props;
    const onChangeSearchData = (field: string, value: string | number) => {
        setSearchData({ ...searchData, [field]: value });
    };
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <StyledInput
                iconLeft={Images.icons.search}
                onPressIconLeft={onPressIconSearch}
                placeholder={t('search.searchPlaceholder')}
                value={searchData?.searchValue}
                onChangeText={(value: any) => onChangeSearchData('searchValue', value)}
                returnKeyType={'done'}
                customStyle={styles.input}
                containerStyle={styles.containerInputStyle}
                onSubmitEditing={onSubmit}
                {...props}
            />
        </View>
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
    containerInputStyle: {
        borderWidth: 0,
        backgroundColor: Themes.COLORS.backgroundInput,
    },
});
export default memo(StyledSearchInput);
