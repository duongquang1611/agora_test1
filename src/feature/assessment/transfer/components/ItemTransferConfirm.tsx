import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemTransferConfirm = (props: any) => {
    const { title = '', textBtn = '', children, onPress, customStyle } = props;
    return (
        <View style={[styles.container, customStyle]}>
            <StyledText i18nText={title} customStyle={styles.title} />
            <View style={styles.content}>
                <View style={styles.childrenView}>{children}</View>
                <StyledTouchable customStyle={styles.btnContainer}>
                    <StyledText i18nText={textBtn} customStyle={styles.btnChange} onPress={onPress} />
                </StyledTouchable>
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: '15@s',
        width: '100%',
        paddingVertical: '16@vs',
        borderBottomWidth: 1,
        borderColor: Themes.COLORS.assessment.confirmTransfer.separatorColor,
    },
    title: {
        color: Themes.COLORS.assessment.confirmTransfer.titleBlockConfirm,
        fontSize: '15@ms',
        lineHeight: '22.5@vs',
        fontWeight: '300',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: '12@vs',
    },
    btnContainer: {
        width: '60@s',
        height: '32@vs',
        borderRadius: 2,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    childrenView: {
        flex: 1,
    },
    btnChange: {
        fontSize: '14@ms',
        fontWeight: '300',
        color: Themes.COLORS.primary,
    },
});

export default ItemTransferConfirm;
