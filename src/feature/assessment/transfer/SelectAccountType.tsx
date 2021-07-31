import { StyledListViewSelected } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { ACCOUNT_TYPE } from 'feature/staticData';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const SelectAccountType = ({ route }: any) => {
    const { setTransfer, transfer } = route.params;
    const [arraySelected, setArraySelected] = useState<any>([transfer?.accountType]);
    const onSelected = (arrSelected: any) => {
        setTransfer({ ...transfer, accountType: arrSelected[0] });
        setArraySelected(arrSelected);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'transfer.accountType.title'} />
            <StyledListViewSelected
                keyText="name"
                data={ACCOUNT_TYPE}
                arraySelected={arraySelected}
                setArraySelected={onSelected}
                isMultiple={false}
                customStyleItem={styles.customItemStyle}
                customStyleText={styles.customStyleText}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    customItemStyle: {
        height: '46@vs',
    },
    customStyleText: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
    },
});

export default SelectAccountType;
