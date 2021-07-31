import * as React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import StyledText from './StyledText';
import StyledTouchable from './StyledTouchable';
import { StyledIcon } from '.';

interface StyledListNoDataProps {
    text?: string;
    canRefresh?: boolean;
    loading?: boolean;
    onRefresh?(): any;
    customStyle?: StyleProp<ViewStyle>;
    customStyleText?: StyleProp<TextStyle>;
    customStyleContainerText?: StyleProp<TextStyle>;
    emptyIcon?: any;
}

const NO_DATA_TEXT = 'データはありません';
const RELOAD = 'Reload';

const StyledNoData: React.FunctionComponent<StyledListNoDataProps> = (props: StyledListNoDataProps) => {
    return (
        <View style={[styles.container, props.customStyle]}>
            {props.loading ? (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <View style={[styles.noDataContainer, props.customStyleContainerText]}>
                    <StyledText
                        i18nText={props.text ?? NO_DATA_TEXT}
                        customStyle={[styles.noDataTextStyle, props.customStyleText]}
                    />
                    {props?.emptyIcon && <StyledIcon source={props?.emptyIcon} size={75} />}
                </View>
            )}
            {!!props.canRefresh && !props.loading ? (
                <StyledTouchable onPress={props.onRefresh}>
                    <StyledText i18nText={RELOAD} customStyle={styles.textReload} />
                </StyledTouchable>
            ) : (
                <View />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    noDataTextStyle: {
        fontSize: 15,
        marginBottom: 35,
    },
    noDataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    text: {
        fontWeight: '600',
        fontSize: 14,
        color: Themes.COLORS.primary,
        textAlign: 'center',
    },
    textReload: {
        margin: 12,
        color: Themes.COLORS.primary,
    },
});

export default StyledNoData;
