import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import { staticValue } from 'feature/staticData';
import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface HeaderItemProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    onPress?(): void;
    totalNotification?: number;
    isActive?: boolean;
}

const HeaderItem = (props: HeaderItemProps) => {
    const { title = '', customStyle, titleStyle, onPress, totalNotification = 0, isActive } = props;
    const total =
        totalNotification >= staticValue.MAX_NOTIFICATION ? staticValue.MAX_NOTIFICATION_TEXT : totalNotification;
    return (
        <StyledTouchable customStyle={[styles.itemContainer, customStyle]} onPress={onPress}>
            <StyledText i18nText={title} customStyle={[styles.title, titleStyle]} />
            {totalNotification > staticValue.NO_VALUE && (
                <View
                    style={[
                        styles.viewCountNotification,
                        { backgroundColor: isActive ? Themes.COLORS.white : Themes.COLORS.assessment.confirm.camera },
                    ]}
                >
                    <StyledText
                        i18nText={total?.toString()}
                        customStyle={[
                            styles.textCount,
                            { color: !isActive ? Themes.COLORS.white : Themes.COLORS.assessment.confirm.camera },
                        ]}
                    />
                </View>
            )}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    itemContainer: {
        height: '28@vs',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        fontSize: '13@ms',
    },
    viewCountNotification: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
    },
    textCount: {
        fontSize: 7,
        fontWeight: 'bold',
        color: Themes.COLORS.white,
    },
});

export default HeaderItem;
