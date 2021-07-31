import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface Props {
    title: string;
}

const DivideTitle = (props: Props) => {
    return (
        <View style={styles.container}>
            <StyledText i18nText={props?.title} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: Themes.COLORS.mercury,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
export default DivideTitle;
