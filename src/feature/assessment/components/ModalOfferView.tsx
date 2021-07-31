import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import { staticValue } from 'feature/staticData';
import React from 'react';
import { View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { formatMoney } from 'utilities/format';

const ModalOfferView = (props: any) => {
    const { onPressCancel, onPressOk, data } = props;
    const { brand, category, price, currency = staticValue.CURRENCY } = data;
    return (
        <View style={styles.container}>
            <StyledText i18nText={'videoView.offerComing'} customStyle={styles.title} />
            <View style={styles.content}>
                <View style={styles.amountContainer}>
                    <StyledText i18nText={'videoView.amount'} customStyle={styles.textNearAmount} />
                    <StyledText
                        originValue={formatMoney(price)}
                        customStyle={[
                            styles.textAmount,
                            price.toString().length === staticValue.PRICE_MAX_LENGTH && { fontSize: moderateScale(36) },
                        ]}
                    />
                    <StyledText originValue={currency} customStyle={styles.textNearAmount} />
                </View>
                <StyledText
                    i18nText={'videoView.brand'}
                    i18nParams={{ brand }}
                    customStyle={styles.normalText}
                    numberOfLines={1}
                />
                <StyledText
                    i18nText={'videoView.category'}
                    i18nParams={{ category }}
                    customStyle={styles.normalText}
                    numberOfLines={1}
                />
            </View>

            <View style={styles.containerBtn}>
                <StyledButton
                    title="videoView.reject"
                    isOutlineButton={true}
                    onPress={onPressCancel}
                    customStyle={styles.btnContainer}
                    customTitleStyle={styles.titleBtn}
                />
                <StyledButton
                    title="videoView.sell"
                    onPress={onPressOk}
                    customStyle={styles.btnContainer}
                    customTitleStyle={styles.titleBtn}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '328@s',
        height: '338@vs',
        backgroundColor: Themes.COLORS.white,
        borderRadius: 14,
        paddingHorizontal: '15@s',
        paddingVertical: '25@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: '20@vs',
        marginBottom: '35@vs',
        marginLeft: '12@vs',
    },
    title: {
        fontSize: '22@ms',
        lineHeight: '33@vs',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '25@vs',
    },
    textBtn: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        color: Themes.COLORS.tutorialView.textBtnAge,
        flex: 1,
        textAlign: 'center',
        padding: '10@s',
    },
    textBtnYes: {
        fontWeight: 'bold',
    },
    separator: {
        height: '100%',
        backgroundColor: Themes.COLORS.silver,
        width: 0.5,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    btnContainer: {
        width: '130@s',
        borderRadius: 3,
        marginHorizontal: '5@s',
        height: '48@vs',
        paddingHorizontal: 0,
    },
    normalText: {
        fontSize: '17@ms',
        lineHeight: '22.5@vs',
        color: Themes.COLORS.videoCallView.textOffer,
        marginTop: '15@vs',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    textAmount: {
        fontSize: '40@ms',
        fontWeight: 'bold',
        marginBottom: '-8@vs',
    },
    textNearAmount: {
        fontSize: '17@ms',
        fontWeight: 'bold',
        color: Themes.COLORS.primary,
        marginLeft: 2,
    },
    titleBtn: {
        fontSize: '16@ms',
    },
});

export default ModalOfferView;
