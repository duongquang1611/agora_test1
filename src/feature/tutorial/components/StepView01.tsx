import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledImage } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StepView01: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContent}>
                <StyledImage source={Images.icons.intro.step01.main} customStyle={styles.image} />
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        marginTop: '50@vs',
    },
    headerContainer: {
        backgroundColor: Themes.COLORS.primary,
        height: '80@vs',
    },
    customTitleHeader: {
        fontSize: '18@ms',
        lineHeight: '23.4@vs',
        fontWeight: '700',
        color: Themes.COLORS.white,
    },
    handStep1: {
        position: 'absolute',
        right: '26@s',
        bottom: '40@vs',
    },
    imageContent: {
        width: '291.5@s',
        height: '353@s',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
export default StepView01;
