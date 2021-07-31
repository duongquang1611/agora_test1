import { createStackNavigator } from '@react-navigation/stack';
import { apiResource } from 'api/resource';
import { updateResource } from 'app-redux/resource/actions';
import { RootState } from 'app-redux/rootReducer';
import AlertMessage from 'components/base/AlertMessage';
import WebViewScreen from 'components/common/WebViewScreen';
import ChangeIDMenu from 'feature/account/ChangeIdMenu';
import ConfirmCard from 'feature/account/ConfirmCard';
import CurrentID from 'feature/account/CurrentID';
import AddressNameScreen from 'feature/account/personInfo/AddressNameScreen';
import ChangePhoneNumber from 'feature/account/personInfo/ChangePhoneNumber';
import OtpChangePhoneView from 'feature/account/personInfo/OtpChangePhoneView';
import SettingPersonInfo from 'feature/account/personInfo/SettingPersonInfo';
import SettingNotification from 'feature/account/SettingNotification';
import UploadDriverCard from 'feature/account/UploadDriverCard';
import UploadHealthCard from 'feature/account/UploadHealthCard';
import UploadIndividualNumberCard from 'feature/account/UploadIndividualNumberCard';
import UploadPassport from 'feature/account/UploadPassport';
import UploadResidentRegisterCard from 'feature/account/UploadResidentRegisterCard';
import AssessmentView from 'feature/assessment/AssessmentView';
import BrandCategoryView from 'feature/assessment/BrandCategoryView';
import ConfirmVideoCallView from 'feature/assessment/components/ConfirmVideoCallView';
import AssessmentProductView from 'feature/assessment/confirm/AssessmentProductView';
import ConfirmContentView from 'feature/assessment/confirm/ConfirmContentView';
import TakeCertificateView from 'feature/assessment/confirm/TakeCertificateView';
import ConversationView from 'feature/assessment/edit/ConversationView';
import EditContentView from 'feature/assessment/edit/EditContentView';
import MethodAssessmentView from 'feature/assessment/edit/MethodAssessmentView';
import PreciousHasBrand from 'feature/assessment/PreciousHasBrand';
import PrepareTimeView from 'feature/assessment/PrepareTimeView';
import CompleteTransfer from 'feature/assessment/transfer/CompleteTransfer';
import ConfirmTransfer from 'feature/assessment/transfer/ConfirmTransfer';
import SelectAccountType from 'feature/assessment/transfer/SelectAccountType';
import SelectBank from 'feature/assessment/transfer/SelectBank';
import SelectTransfer from 'feature/assessment/transfer/SelectTransfer';
import VideoCallView from 'feature/assessment/VideoCallView';
import TransactionHistoryDetail from 'feature/history/TransactionHistoryDetail';
import OtpView from 'feature/identification/OtpView';
import React, { useEffect } from 'react';
import { Host } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';
import navigationConfigs from '../config/options';
import {
    ACCOUNT_ROUTE,
    APP_ROUTE,
    ASSESSMENT_ROUTE,
    HISTORY_ROUTE,
    IDENTIFY_ROUTE,
    WEBVIEW_ROUTE,
} from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

const MainStack = createStackNavigator();

const AppStack = () => {
    return (
        <Host>
            <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
                <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.SELECT_TRANSFER} component={SelectTransfer} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.VIDEO_CALL_VIEW} component={VideoCallView} />
                <MainStack.Screen name={ACCOUNT_ROUTE.ADDRESS} component={AddressNameScreen} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.BRAND_CATEGORY_VIEW} component={BrandCategoryView} />
                <MainStack.Screen name={IDENTIFY_ROUTE.OTP_VIEW} component={OtpView} />
                <MainStack.Screen name={ACCOUNT_ROUTE.PERSON_INFO} component={SettingPersonInfo} />
                <MainStack.Screen name={ACCOUNT_ROUTE.CHANGE_PHONE} component={ChangePhoneNumber} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.METHOD_ASSESSMENT} component={MethodAssessmentView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.ASSESSMENT_PRODUCT} component={AssessmentProductView} />
                <MainStack.Screen name={ACCOUNT_ROUTE.OTP_CHANGE_PHONE} component={OtpChangePhoneView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.PREPARE_TIME} component={PrepareTimeView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.CONFIRM_CALL} component={ConfirmVideoCallView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.CONFIRM_CONTENT} component={ConfirmContentView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.EDIT_CONTENT} component={EditContentView} />
                <MainStack.Screen name={HISTORY_ROUTE.DETAIL} component={TransactionHistoryDetail} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.TAKE_CERTIFICATE} component={TakeCertificateView} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.PRECIOUS_HAS_BRAND} component={PreciousHasBrand} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.SELECT_BANK} component={SelectBank} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.SELECT_ACCOUNT_TYPE} component={SelectAccountType} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.CONFIRM_TRANSFER} component={ConfirmTransfer} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.COMPLETE_TRANSFER} component={CompleteTransfer} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.CONVERSATION} component={ConversationView} />
                <MainStack.Screen name={ACCOUNT_ROUTE.SETTINGS_NOTIFICATION} component={SettingNotification} />
                <MainStack.Screen name={ACCOUNT_ROUTE.CHANGE_ID} component={CurrentID} />
                <MainStack.Screen name={ACCOUNT_ROUTE.CONFIRM_CARD} component={ConfirmCard} />
                <MainStack.Screen name={ACCOUNT_ROUTE.UPLOAD_PASSPORT} component={UploadPassport} />
                <MainStack.Screen name={ACCOUNT_ROUTE.UPLOAD_DRIVER_CARD} component={UploadDriverCard} />
                <MainStack.Screen name={ACCOUNT_ROUTE.UPLOAD_HEALTH_CARD} component={UploadHealthCard} />
                <MainStack.Screen
                    name={ACCOUNT_ROUTE.UPLOAD_RESIDENT_REGISTER_CARD}
                    component={UploadResidentRegisterCard}
                />

                <MainStack.Screen name={ACCOUNT_ROUTE.CHANGE_ID_MENU} component={ChangeIDMenu} />
                <MainStack.Screen name={ACCOUNT_ROUTE.PICK_IMAGE_ID} component={UploadIndividualNumberCard} />
                <MainStack.Screen name={ASSESSMENT_ROUTE.ASSESSMENT_VIEW} component={AssessmentView} />
                <MainStack.Screen name={WEBVIEW_ROUTE.WEBVIEW} component={WebViewScreen} />
            </MainStack.Navigator>
        </Host>
    );
};

const Navigation: React.FunctionComponent = () => {
    const dispatch: any = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state);
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const dataResource = await apiResource.init();
    //             dispatch(updateResource(dataResource?.data));
    //         } catch (err) {
    //             AlertMessage(err);
    //         }
    //     })();
    // }, []);

    if (userInfo?.token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
