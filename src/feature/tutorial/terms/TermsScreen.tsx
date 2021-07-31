import { updateCommon } from 'app-redux/common/actions';
import { StyledButton, StyledText } from 'components/base';
import useModal from 'components/base/modal/useModal';
import { DATA_URL, staticValue } from 'feature/staticData';
import { AUTHENTICATE_ROUTE, WEBVIEW_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { getConfig } from 'utilities/convert';
import ItemCheckbox from './components/ItemCheckbox';
import ModalCheckAge from './components/ModalCheckAge';

const TermsScreen = () => {
    const [checkData, setCheckData] = useState<any>({
        terms: false,
        policy: false,
    });
    const termUrl = getConfig(staticValue.CONFIG_KEY.WEB_TERM)?.value;
    const policyUrl = getConfig(staticValue.CONFIG_KEY.WEB_POLICY)?.value;
    const dispatch = useDispatch();
    const modal = useModal();
    const onPressBtnAgree = () => {
        dispatch(updateCommon({ showTerms: false }));
        navigate(AUTHENTICATE_ROUTE.LOGIN);
    };
    const toggleCheck = (id: string) => {
        const newCheck = { ...checkData, [id]: !checkData[id] };
        if (id === 'terms' && !checkData[id]) {
            showModalAge();
        } else {
            setCheckData(newCheck);
        }
    };
    const showModalAge = () => {
        modal.show({
            children: (
                <ModalCheckAge
                    onPressCancel={() => {
                        setCheckData({ ...checkData, terms: false });
                        modal.dismiss();
                    }}
                    onPressOk={() => {
                        setCheckData({ ...checkData, terms: true });
                        modal.dismiss();
                    }}
                />
            ),
        });
    };
    const onPressPolicy = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: policyUrl || DATA_URL.policy,
        });
    };
    const onPressTerms = () => {
        navigate(WEBVIEW_ROUTE.WEBVIEW, {
            url: termUrl || DATA_URL.terms,
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <StyledText i18nText="tutorial.terms.title" customStyle={styles.title} />
                <ItemCheckbox
                    title="tutorial.terms.termsOfService"
                    subTitle="tutorial.terms.agree"
                    onPressCheck={() => toggleCheck('terms')}
                    onPressTitle={onPressTerms}
                    active={checkData.terms}
                />
                <ItemCheckbox
                    title="tutorial.terms.policy"
                    subTitle="tutorial.terms.agree"
                    onPressCheck={() => toggleCheck('policy')}
                    onPressTitle={onPressPolicy}
                    active={checkData.policy}
                />
                <StyledButton
                    title={'tutorial.terms.btnAgree'}
                    onPress={onPressBtnAgree}
                    customStyle={styles.customStyleBtn}
                    disabled={!(checkData.terms && checkData.policy)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingHorizontal: '30@s',
        paddingVertical: '100@vs',
    },
    title: {
        fontSize: '20@ms',
        lineHeight: '30@vs',
        fontWeight: '600',
        textAlign: 'center',
    },
    customStyleBtn: {
        marginTop: '40@vs',
        alignSelf: 'center',
    },
});

export default TermsScreen;
