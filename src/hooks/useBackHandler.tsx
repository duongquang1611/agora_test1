import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (onBack: any = () => true) => {
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onBack);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBack);
            };
        }, []),
    );
};
export default useBackHandler;
