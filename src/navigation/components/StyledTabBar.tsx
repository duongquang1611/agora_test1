import React, { useEffect, useState } from 'react';
import { Platform, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Metrics from 'assets/metrics';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyledText } from 'components/base';
import { Themes } from 'assets/themes';
import Size from 'assets/sizes';
import { staticValue } from 'feature/staticData';
import { useSelector } from 'react-redux';

const StyledTabBar: React.FunctionComponent<BottomTabBarProps> = ({ state, descriptors, navigation }: any) => {
    const { totalNotification } = useSelector((stateNotification: any) => stateNotification.notification);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(
            totalNotification >= staticValue.MAX_NOTIFICATION ? staticValue.MAX_NOTIFICATION_TEXT : totalNotification,
        );
    }, [totalNotification]);

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View key={route.key}>
                        {options?.name === 'ASSESSMENT_ROUTE' ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                accessibilityRole="button"
                                // accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                key={route.key}
                                style={[styles.tabButtonCenter]}
                            >
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-ignore */}
                                <Image
                                    source={options?.icon}
                                    style={[
                                        styles.tabIcon,
                                        { width: options.sizeIcon.width, height: options.sizeIcon.height },
                                    ]}
                                />
                                <StyledText customStyle={[styles.tabLabelCenter]} i18nText={options?.title || ''} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={1}
                                accessibilityRole="button"
                                // accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                key={route.key}
                                style={[styles.tabButton]}
                            >
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-ignore */}
                                <Image
                                    source={isFocused ? options?.iconActive : options?.icon}
                                    style={[
                                        styles.tabIcon,
                                        {
                                            width: options.sizeIcon.width,
                                            height: options.sizeIcon.height,
                                        },
                                    ]}
                                />

                                {options?.name === 'NOTIFICATION_ROOT' && totalNotification > staticValue.NO_VALUE ? (
                                    <View style={styles.viewCountNotification}>
                                        <StyledText i18nText={total.toString()} customStyle={styles.textCount} />
                                    </View>
                                ) : null}
                                <StyledText
                                    customStyle={[
                                        styles.tabLabel,
                                        { color: isFocused ? Themes.COLORS.primary : Themes.COLORS.silver },
                                    ]}
                                    i18nText={options?.title || ''}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? Metrics.safeBottomPadding : 0,
        borderTopColor: '#DEE2E6',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
    },
    tabButton: {
        marginHorizontal: 5,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 50,
        alignItems: 'center',
    },
    tabButtonCenter: {
        marginHorizontal: 5,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 34,
        alignItems: 'center',
        backgroundColor: Themes.COLORS.bottomTab.camera,
        width: 68,
        height: 68,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        bottom: 17,
    },
    tabIcon: {
        resizeMode: 'contain',
    },
    tabLabel: {
        color: Themes.COLORS.bottomTab.titleColor,
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
        marginTop: 4,
        fontSize: 10,
    },
    tabLabelCenter: {
        color: Themes.COLORS.white,
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 4,
    },
    viewCountNotification: {
        backgroundColor: Themes.COLORS.assessment.confirm.camera,
        width: 18,
        height: 18,
        borderRadius: 9,
        position: 'absolute',
        right: 10,
        top: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCount: {
        fontSize: 7,
        fontWeight: 'bold',
        color: Themes.COLORS.white,
    },
});

export default StyledTabBar;
