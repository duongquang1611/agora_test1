import { closeTransaction } from 'api/assessment';
import { getStatusTransaction } from 'api/home';
import { getTotalNotification } from 'api/modules/api-app/notification';
import { updateCommon } from 'app-redux/common/actions';
import { updateNotification } from 'app-redux/notification/actions';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledFastImage from 'components/base/StyledFastImage';
import ShowAlertMessage from 'components/common/ShowAlertMessage';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from 'utilities/convert';
import { countJoinFunction, isIos, logger } from 'utilities/helper';
import { useOnesignal } from 'utilities/notification';
import { DATA_URL, staticValue } from '../staticData';
import CategoryView from './CategoryView';
import ModalNotificationView from './components/ModalNotificationView';

const HomeView = () => {
    const modal = useModal();
    const { configs, subCategories } = useSelector((state: any) => state.resource);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <StyledText i18nText={'abc'} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Themes.COLORS.homeView.title,
        marginTop: 72,
        marginLeft: 29,
    },
    underLine: {
        backgroundColor: Themes.COLORS.homeView.underLine,
        height: 2,
    },
    textTab: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 17,
    },
    tabCategory: {},
    banner: {
        width: '100%',
        height: '429@vs',
    },
    detail: {
        fontSize: '24@s',
        lineHeight: '36@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.white,
        left: '24@s',
        position: 'absolute',
        top: '56@vs',
    },
    buttonStartAssessment: {
        position: 'absolute',
        width: '327@s',
        height: '50@s',
        bottom: '40@s',
    },
    buttonHelp: {
        borderRadius: 1,
        borderWidth: 1,
        borderColor: Themes.COLORS.bottomTab.camera,
        justifyContent: 'center',
        width: '327@s',
        marginTop: '36@s',
        alignSelf: 'center',
        alignItems: 'center',
        height: '66@s',
    },
    textHelp: {
        fontSize: '15@vs',
        fontWeight: 'bold',
        color: Themes.COLORS.bottomTab.camera,
    },
    category: {
        fontSize: '18@vs',
        color: Themes.COLORS.homeView.title,
        fontWeight: 'bold',
        marginTop: '65@vs',
        marginLeft: '24@s',
    },
});

export default HomeView;
