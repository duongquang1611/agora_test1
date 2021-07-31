import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { DATA_URL, staticValue } from 'feature/staticData';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { getConfig } from 'utilities/convert';
import { getStoreUrl } from 'utilities/format';
import { openURL } from 'utilities/helper';

interface Props {
    tabIndex?: number;
    onPress?: any;
    changeParcelCode?: () => void;
    status: number;
}

const HeaderPage = (props: Props) => {
    const { ALL_TRANSACTION_STATUS } = staticValue;
    const { tabIndex = ALL_TRANSACTION_STATUS.SUCCESS, status } = props;
    const handleReviewApp = () => {
        openURL(getStoreUrl(), false);
    };
    const guidePackage = getConfig(staticValue.CONFIG_KEY.WEB_TUTORIAL)?.value || DATA_URL.manual;
    // const guidePackage = getConfig(staticValue.CONFIG_KEY.WEB_PACKAGING_INSTRUCTION)?.value || DATA_URL.guidePackage;
    const renderHeaderPageTab1 = () => {
        return (
            <View style={styles.container}>
                <View style={styles.subTitle}>
                    <StyledIcon source={Images.icons.checked} size={22} customStyle={styles.iconChecked} />
                    <StyledText i18nText={'transactionHistoryDetail.tab1.pleaseShip'} customStyle={styles.thankYou} />
                </View>
                <StyledText
                    i18nText={'transactionHistoryDetail.tab1.packAndShip'}
                    customStyle={styles.packAndShipText}
                />
                <StyledTouchable onPress={() => openURL(guidePackage)}>
                    <StyledText
                        i18nText={'transactionHistoryDetail.tab1.packingMethod'}
                        customStyle={styles.packingMethodText}
                    />
                </StyledTouchable>
                <StyledButton
                    onPress={props?.onPress}
                    title="transactionHistoryDetail.tab1.button"
                    customStyle={styles.buttonStyle}
                />
            </View>
        );
    };
    const renderHeaderPageTab2 = () => {
        return (
            <View style={styles.container}>
                <View style={styles.subTitle}>
                    <StyledIcon source={Images.icons.checked} size={22} customStyle={styles.iconChecked} />
                    <StyledText i18nText={'transactionHistoryDetail.tab2.sendText'} customStyle={styles.thankYou} />
                </View>
                <StyledText i18nText={'transactionHistoryDetail.tab2.packAndShip'} customStyle={styles.thankYou2} />
                <StyledButton
                    onPress={handleReviewApp}
                    title="transactionHistoryDetail.tab2.goToReview"
                    customStyle={styles.buttonStyle}
                />
                {status === ALL_TRANSACTION_STATUS.SENT && (
                    <StyledButton
                        onPress={() => props?.changeParcelCode?.()}
                        title="transactionHistoryDetail.tab2.changeParcel"
                        customStyle={styles.changeParcelBtn}
                    />
                )}
            </View>
        );
    };
    const returnHeaderPageTab3 = () => {
        return (
            <View style={styles.container}>
                <View style={styles.subTitle}>
                    <StyledIcon source={Images.icons.checked} size={22} customStyle={styles.iconChecked} />
                    <StyledText
                        i18nText={'transactionHistoryDetail.tab3.assessmentText'}
                        customStyle={styles.thankYou}
                    />
                </View>
                <StyledText i18nText={'transactionHistoryDetail.tab3.thankYou'} customStyle={styles.thankYou2} />
            </View>
        );
    };

    if (tabIndex === 2) return renderHeaderPageTab2();
    if (tabIndex === 3) return returnHeaderPageTab3();
    return renderHeaderPageTab1();
};

const styles = ScaledSheet.create({
    subTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconChecked: {
        marginRight: 5,
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    thankYou: {
        fontSize: 18,
        lineHeight: 27,
        fontWeight: '600',
    },
    thankYou2: {
        fontSize: 14,
        lineHeight: 27,
        marginBottom: 5,
    },
    packAndShipText: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '600',
        marginBottom: 10,
    },
    packingMethodText: {
        fontSize: 14,
        lineHeight: 19,
        fontWeight: '600',
        color: Themes.COLORS.primary,
    },
    buttonStyle: {
        width: '100%',
        marginTop: 10,
        marginBottom: 12,
    },
    changeParcelBtn: {
        width: '100%',
    },
});
export default HeaderPage;
