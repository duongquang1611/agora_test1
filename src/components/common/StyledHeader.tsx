import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React from 'react';
import { StatusBar, StyleProp, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface StyledHeaderProps extends ViewProps {
    iconRight?: any;
    hasBack?: boolean;
    title?: string;
    onPressBack?(): void;
    onPressRight?(): void;
    customTitleStyle?: StyleProp<TextStyle>;
    customTitleContainer?: StyleProp<ViewStyle>;
    customIconBack?: StyleProp<ViewStyle>;
    customContainer?: StyleProp<ViewStyle>;
    hasBorderBottom?: boolean;
    statusBarColor?: string;
}

const StyledHeader = (props: StyledHeaderProps) => {
    const {
        title = '',
        hasBack = true,
        onPressBack,
        onPressRight,
        iconRight,
        customIconBack,
        customTitleStyle,
        customTitleContainer,
        customContainer,
        hasBorderBottom = true,
        statusBarColor = Themes.COLORS.white,
    } = props;
    const handleNavigate = () => {
        if (onPressBack) {
            onPressBack();
        } else {
            goBack();
        }
    };
    return (
        <>
            <View style={[styles.container, { borderBottomWidth: hasBorderBottom ? 1 : 0 }, customContainer]}>
                <StatusBar backgroundColor={statusBarColor} barStyle={'dark-content'} {...props} />
                {hasBack ? (
                    <StyledTouchable onPress={handleNavigate} customStyle={[styles.containerBack, customIconBack]}>
                        <StyledIcon size={20} source={Images.icons.back} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.containerBack} />
                )}
                {hasBack ? (
                    <View style={[styles.containerTitle, customTitleContainer]}>
                        <StyledText
                            numberOfLines={1}
                            customStyle={[styles.textTitle, customTitleStyle]}
                            i18nText={title}
                        />
                    </View>
                ) : (
                    <View style={[styles.containerTitle, customTitleContainer]}>
                        <StyledText customStyle={[styles.textTitle, customTitleStyle]} i18nText={title} />
                    </View>
                )}
                {iconRight ? (
                    <StyledTouchable onPress={onPressRight} customStyle={styles.containerRight}>
                        <StyledIcon size={17} source={iconRight} customStyle={styles.iconRight} />
                    </StyledTouchable>
                ) : (
                    <View style={[styles.containerRight]} />
                )}
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight ? 0 : Metrics.safeTopPadding,
        justifyContent: 'center',
        borderBottomColor: Themes.COLORS.concrete,
        height: '44@vs',
    },
    containerBack: {
        marginRight: 'auto',
        marginLeft: '5@s',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30@s',
        height: '30@s',
        paddingTop: '3@vs',
    },
    containerTitleHasBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTitle: {
        width: '80%',
        height: '100%',
        position: 'absolute',
        paddingTop: '3@vs',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: '17@s',
        fontWeight: '600',
        lineHeight: 25.5,
        color: Themes.COLORS.black,
    },
    containerRight: {
        marginLeft: 'auto',
        marginRight: '10@s',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30@s',
        height: '30@s',
        borderRadius: 30,
        backgroundColor: Themes.COLORS.transparent,
    },
    iconRight: {
        tintColor: Themes.COLORS.assessment.iconClose,
    },
});

export default StyledHeader;
