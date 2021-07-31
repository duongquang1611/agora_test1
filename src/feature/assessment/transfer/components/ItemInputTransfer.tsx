import { Themes } from 'assets/themes';
import { StyledInput, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemInputTransfer = (props: any) => {
    const {
        title = '',
        customItemStyle,
        customItemStyleTitle,
        hasSeparator = true,
        widthLine = '90%',
        ...otherPropsInput
    } = props;

    return (
        <>
            <View style={[styles.container, customItemStyle]}>
                <StyledText i18nText={title} customStyle={[styles.title, customItemStyleTitle]} />
                <View style={styles.containerRightView}>
                    <StyledInput {...otherPropsInput} customStyle={styles.customStyleInput} />
                </View>
            </View>
            {hasSeparator && <View style={[styles.separator, { width: widthLine }]} />}
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20@s',
        paddingRight: '15@s',
        paddingVertical: '10@vs',
        marginRight: '8@s',
        height: '46@vs',
    },
    value: {
        fontSize: '14@s',
        lineHeight: '21@vs',
        color: Themes.COLORS.cloudy,
        fontWeight: '300',
        marginRight: '5@s',
        maxWidth: '80%',
    },
    title: {
        fontSize: '14@s',
        lineHeight: '21@vs',
        color: Themes.COLORS.black,
        fontWeight: '300',
        flex: 1,
    },
    separator: {
        height: 1,
        alignSelf: 'center',
        backgroundColor: Themes.COLORS.gallery,
    },
    containerRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1.5,
    },
    customStyleInput: {
        paddingRight: 8,
        textAlign: 'right',
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
    },
});

export default ItemInputTransfer;
