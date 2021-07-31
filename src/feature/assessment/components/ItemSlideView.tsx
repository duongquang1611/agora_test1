import { StyledImage, StyledText } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';

interface ItemSlideProps {
    slide: any;
}

const ItemSlideView = (props: ItemSlideProps) => {
    const { slide } = props;
    return (
        <View style={styles.container}>
            <StyledText i18nText={slide?.title} customStyle={styles.title} />
            <StyledImage
                source={slide?.image}
                customStyle={[styles.image, { width: scale(slide?.width), height: scale(slide?.height) }]}
            />
            <StyledText i18nText={slide?.content} customStyle={styles.content} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '51@vs',
        textAlign: 'center',
    },
    image: {
        marginTop: '44@vs',
    },
    content: {
        fontSize: 15,
        marginTop: 32,
        lineHeight: 22,
    },
});

export default ItemSlideView;
