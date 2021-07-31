import Metrics from 'assets/metrics';
import { StyledIcon } from 'components/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ModalImageView = (props: any) => {
    const { img } = props;
    return (
        <View style={styles.imageView}>
            <StyledIcon source={img} size={Metrics.screenWidth} />
        </View>
    );
};
const styles = StyleSheet.create({
    imageView: {
        position: 'absolute',
        alignSelf: 'center',
    },
});

export default ModalImageView;
