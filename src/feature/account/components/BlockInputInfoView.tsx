import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const BlockInputInfoView = ({ title = '', children }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerSection}>
                <StyledText customStyle={styles.textTitle} i18nText={title} />
            </View>
            <View style={styles.childrenView}>{children}</View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
    },
    containerSection: {
        backgroundColor: Themes.COLORS.wildSand,
        height: '34@vs',
        justifyContent: 'center',
        paddingHorizontal: '12@s',
    },
    textTitle: {
        fontSize: '12@ms',
        lineHeight: '18@vs',
        fontWeight: '300',
    },
    childrenView: {
        backgroundColor: Themes.COLORS.white,
        paddingBottom: '20@vs',
        paddingHorizontal: '20@s',
        justifyContent: 'center',
    },
});

export default BlockInputInfoView;
