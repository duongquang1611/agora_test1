import Images from 'assets/images';
import { StyledButton, StyledIcon, StyledText } from 'components/base';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';

const EmptyHistoryScreen = () => {
    const handlePress = () => {
        navigate(TAB_NAVIGATION_ROOT.ASSESSMENT_ROUTE.ROOT);
    };
    return (
        <View style={styles.container}>
            <StyledText i18nText={'history.empty.title'} customStyle={styles.title} />
            <StyledText i18nText={'history.empty.subTitle'} customStyle={styles.subTitle} />
            <StyledIcon source={Images.icons.emptyHistoryList} size={scale(75)} customStyle={styles.icon} />
            <StyledButton title="history.empty.button" onPress={handlePress} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '20@ms',
        fontWeight: '600',
        lineHeight: '24@vs',
    },
    subTitle: {
        fontSize: '12@ms',
        lineHeight: '19@vs',
        paddingVertical: '12@vs',
    },
    icon: {
        marginVertical: '65@vs',
    },
});
export default EmptyHistoryScreen;
