/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProgressiveImage } from 'components/base';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const ItemImageTransaction = ({ image = {}, customStyle = styles.imageContainer }: any) => {
    return (
        <View style={customStyle}>
            <ProgressiveImage {...image} />
        </View>
    );
};

const styles = ScaledSheet.create({
    imageContainer: {
        height: '150@s',
        width: '150@s',
        borderRadius: 3,
        marginTop: '15@vs',
        overflow: 'hidden',
    },
});

export default ItemImageTransaction;
