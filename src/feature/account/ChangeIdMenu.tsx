import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import StyledHeader from 'components/common/StyledHeader';
import { NAVIGATE_TYPE, staticValue } from 'feature/staticData';
import { ACCOUNT_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { countJoinFunction } from 'utilities/helper';
import ItemIdMenu from './components/ItemIdMenu';

const ChangeIdMenu = ({ route }: any) => {
    const { user } = useSelector((state: any) => state.userInfo);
    const { navigateFrom = '' } = route?.params || {};
    const isFromSetting = navigateFrom === NAVIGATE_TYPE.SETTING;
    const [countAcceptOffer, setCountAcceptOffer] = useState(1);
    const getCount = async () => {
        const countAcceptOfferStorage = await countJoinFunction(staticValue.KEY_OFFER_SUCCESS, false);
        setCountAcceptOffer(Number(countAcceptOfferStorage));
    };

    useEffect(() => {
        getCount();
    }, []);

    const goToUploadDriverCard = () => {
        navigate(ACCOUNT_ROUTE.UPLOAD_DRIVER_CARD, { navigateFrom });
    };
    const goToUploadHealthCard = () => {
        navigate(ACCOUNT_ROUTE.UPLOAD_HEALTH_CARD, { navigateFrom });
    };
    const goToUploadPassport = () => {
        navigate(ACCOUNT_ROUTE.UPLOAD_PASSPORT, { navigateFrom });
    };
    const goToUploadResidentRegisterCard = () => {
        navigate(ACCOUNT_ROUTE.UPLOAD_RESIDENT_REGISTER_CARD, { navigateFrom });
    };
    const changeIndividualNumberCard = () => {
        navigate(ACCOUNT_ROUTE.PICK_IMAGE_ID, { navigateFrom });
    };

    return (
        <View style={styles.flex1}>
            <StyledHeader title="verifyIdentity.changeIdMenu.title" />
            <View style={styles.content}>
                {(isFromSetting ? user?.IDCards?.length === 0 : countAcceptOffer <= staticValue.DEFAULT_VALUE) && (
                    <StyledText i18nText="changeId.menu.description" customStyle={styles.descriptionText} />
                )}
                <ItemIdMenu title="verifyIdentity.driverCard" onPress={goToUploadDriverCard} />
                <ItemIdMenu title="verifyIdentity.healthCard" onPress={goToUploadHealthCard} />
                <ItemIdMenu title="verifyIdentity.passportCard" onPress={goToUploadPassport} />
                <ItemIdMenu title="verifyIdentity.individualNumberCard" onPress={changeIndividualNumberCard} />
                <ItemIdMenu title="verifyIdentity.residentRegisterCard" onPress={goToUploadResidentRegisterCard} />
                <StyledText i18nText="noticeSetting.noteText" customStyle={styles.noteText} />
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    descriptionText: {
        fontSize: '15@ms',
        fontWeight: '300',
        paddingHorizontal: '15@s',
        paddingTop: '35@vs',
        paddingBottom: '15@vs',
    },
    subTitle: {
        fontSize: 15,
        width: '100%',
        padding: 20,
        paddingTop: '36@vs',
    },
    noteText: {
        fontSize: '12@vs',
        color: Themes.COLORS.red,
        width: '100%',
        paddingHorizontal: '15@s',
        paddingTop: '20@vs',
    },
    content: {
        backgroundColor: Themes.COLORS.white,
        flex: 1,
    },
    lastItem: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        borderBottomColor: Themes.COLORS.gallery,
        borderBottomWidth: 1,
        borderTopColor: Themes.COLORS.gallery,
        borderTopWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '15@s',
        marginLeft: '10@s',
        paddingLeft: '5@s',
        paddingVertical: '15@vs',
    },
    item: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        borderBottomColor: Themes.COLORS.separatorColor,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '15@s',
        marginLeft: '10@s',
        paddingLeft: '5@s',
        paddingVertical: '15@vs',
    },
    flex1: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    grayBg: {
        flex: 1,
        backgroundColor: Themes.COLORS.accountView.background,
    },
    itemStyleContainer: {
        height: '45@vs',
    },
});
export default ChangeIdMenu;
