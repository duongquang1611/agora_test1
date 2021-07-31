import { Themes } from 'assets/themes';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import StyledHeader from './StyledHeader';

const WebViewScreen = (props: any) => {
    const { route } = props;
    const { params = {} } = route;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const webviewRef = React.useRef<any>();
    return (
        <View style={styles.container}>
            <StyledHeader title={title} />
            <StyledOverlayLoading visible={loading} />
            <WebView
                ref={webviewRef}
                source={{ uri: params?.url }}
                style={styles.webview}
                cacheEnabled={false}
                onNavigationStateChange={(state) => {
                    setLoading(state?.loading);
                    if (state?.title && !state?.loading) {
                        setTitle(state?.title || params?.title);
                    }
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    webview: {
        marginTop: 1,
        flex: 1,
    },
});

export default WebViewScreen;
