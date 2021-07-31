import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { View, ImageProps } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface StyledHeaderEditProps {
    icon: ImageProps;
    title: string;
    onPress?(): void;
}

const StyledHeaderEdit = (props: StyledHeaderEditProps) => {
    const { icon, title, onPress } = props;
    return (
        <>
            <View style={styles.container}>
                <StyledTouchable onPress={onPress} customStyle={styles.close}>
                    <StyledIcon source={icon} size={18} customStyle={styles.icon} />
                </StyledTouchable>
                <StyledText i18nText={title} customStyle={styles.title} />
                <View />
            </View>
            <View style={styles.line} />
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '64@vs',
        alignItems: 'center',
        borderRadius: 10,
    },
    icon: {
        tintColor: Themes.COLORS.assessment.iconClose,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.takePicture,
    },
    line: {
        height: 1,
        backgroundColor: Themes.COLORS.concrete,
        width: '100%',
    },
    close: {
        marginLeft: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default StyledHeaderEdit;
