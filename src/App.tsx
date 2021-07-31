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
import { SocketProvider } from 'utilities/SocketProvider';
import { addMenuClearAsyncStorage, isIos } from 'utilities/helper';

LogBox.ignoreLogs(['Require cycle:']);

const App: React.FunctionComponent = () => {
    useEffect(() => {
        addMenuClearAsyncStorage();
        SplashScreen.hide();
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
