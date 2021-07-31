import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { staticValue } from 'feature/staticData';
import useBackHandler from 'hooks/useBackHandler';
import { APP_ROUTE } from 'navigation/config/routes';
import { reset } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { countJoinFunction } from 'utilities/helper';

const CompleteTransfer = () => {
    const [countAcceptOffer, setCountAcceptOffer] = useState(1);
    const getCount = async () => {
        const countAcceptOfferStorage = await countJoinFunction(staticValue.KEY_OFFER_SUCCESS, false);
        setCountAcceptOffer(Number(countAcceptOfferStorage));
    };
    useEffect(() => {
        getCount();
    }, []);
    const goHome = () => {
        reset(APP_ROUTE.MAIN_TAB);
        return true;
    };
    useBackHandler(goHome);
    return (
        <>
            <StyledHeader title={'transfer.complete.title'} />
            <View style={styles.container}>
                <StyledText i18nText={'transfer.complete.textComplete'} customStyle={styles.textTitle} />
                <StyledText i18nText={'transfer.complete.thank'} customStyle={styles.textThank} />
                {countAcceptOffer <= 1 && (
                    <StyledText i18nText={'transfer.complete.remind'} customStyle={styles.textRemind} />
                )}
                <StyledIcon source={Images.icons.transfer.congratulation} size={150} customStyle={styles.icon} />
                <StyledButton title="transfer.complete.home" onPress={goHome} customStyle={styles.btn} />
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '40@s',
        backgroundColor: Themes.COLORS.white,
        alignItems: 'center',
        paddingTop: '120@vs',
    },
    textTitle: {
        fontSize: '20@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
    },
    textThank: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        marginTop: '20@vs',
        color: Themes.COLORS.assessment.textThank,
    },
    textRemind: {
        fontSize: '14@ms',
        lineHeight: '21@vs',
        fontWeight: '300',
        color: Themes.COLORS.assessment.textThank,
    },
    icon: {
        marginTop: '56@vs',
    },
    btn: {
        marginTop: '60@vs',
    },
});

export default CompleteTransfer;
