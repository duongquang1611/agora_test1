import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardStatus() {
    const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setIsOpenKeyboard(true));
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => setIsOpenKeyboard(false));
        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    });

    return { isOpenKeyboard };
}
