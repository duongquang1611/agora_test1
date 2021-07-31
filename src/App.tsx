import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'app-redux/store';
import { NavigationContainer } from '@react-navigation/native';
import 'utilities/i18next';
import { navigationRef } from 'navigation/NavigationService';
import Navigation from 'navigation/scene/RootScenes';
import { RootSiblingParent } from 'react-native-root-siblings';
import APIProvider from 'utilities/context/APIProvider';
import SplashScreen from 'react-native-splash-screen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AsyncStorage from '@react-native-community/async-storage';
import { SocketProvider } from 'utilities/SocketProvider';
import Config from 'react-native-config';
import codePush from 'react-native-code-push';
import { isIos } from 'utilities/helper';

LogBox.ignoreLogs(['Require cycle:']);

const App: React.FunctionComponent = () => {
    useEffect(() => {
        // quick clear cache AsyncStorage
        // AsyncStorage.clear();
        __DEV__
            ? SplashScreen.hide()
            : codePush
                  .sync({
                      updateDialog: undefined,
                      installMode: codePush.InstallMode.IMMEDIATE,
                      deploymentKey: !isIos
                          ? Config.CODEPUSH_ANDROID_DEVELOPMENT_KEY
                          : Config.CODEPUSH_IOS_DEVELOPMENT_KEY,
                  })
                  .then(() => {
                      SplashScreen.hide();
                  });
    }, []);
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <SocketProvider>
                    <APIProvider>
                        <RootSiblingParent>
                            <NavigationContainer ref={navigationRef}>
                                <Navigation />
                            </NavigationContainer>
                        </RootSiblingParent>
                    </APIProvider>
                </SocketProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
