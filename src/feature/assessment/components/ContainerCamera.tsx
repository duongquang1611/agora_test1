import { Themes } from 'assets/themes';
import { StyledText } from 'components/base';
import React from 'react';
import { View, StyleSheet, ImageProps, StyleProp, TextStyle } from 'react-native';
import ItemImageView from './ItemImageView';

interface ContainerProps {
    image: ImageProps;
    onPress?(): void;
    customStyle?: StyleProp<TextStyle>;
    index: number;
    title: string;
    viewNull?: boolean;
    disabled?: boolean;
}
const ContainerCamera = (props: ContainerProps) => {
    const { image, onPress, customStyle, index, title, viewNull = false, disabled = false } = props;
    return (
        <View style={[customStyle]}>
            <View style={styles.viewTitle}>
                <View style={styles.index}>
                    <StyledText i18nText={index?.toString()} customStyle={styles.textIndex} />
                </View>
                <StyledText i18nText={title} customStyle={styles.titlePicture} />
            </View>
            <ItemImageView
                image={image}
                width={157}
                height={157}
                disabled={disabled}
                viewNull={viewNull}
                onPress={onPress}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    index: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Themes.COLORS.bottomTab.camera,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIndex: {
        fontSize: 12,
        color: Themes.COLORS.white,
    },
    titlePicture: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Themes.COLORS.assessment.titlePicture,
        marginLeft: 4,
    },
    viewTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        marginLeft: 3,
    },
});

export default ContainerCamera;
