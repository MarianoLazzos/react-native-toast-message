import React from 'react';
import { Keyboard } from 'react-native';
import { isIOS } from '../utils/platform';
export function useKeyboard() {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);
    const onShow = React.useCallback((event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height);
        setIsKeyboardVisible(true);
    }, []);
    const onHide = React.useCallback(() => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
    }, []);
    React.useEffect(() => {
        const didShowListener = Keyboard.addListener(!isIOS() ? 'keyboardDidShow' : 'keyboardWillShow', onShow);
        const didHideListener = Keyboard.addListener(!isIOS() ? 'keyboardDidHide' : 'keyboardWillHide', onHide);
        return () => {
            didShowListener.remove();
            didHideListener.remove();
        };
    }, [onHide, onShow]);
    return {
        keyboardHeight,
        isKeyboardVisible
    };
}
