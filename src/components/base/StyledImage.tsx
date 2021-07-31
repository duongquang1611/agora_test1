import React from 'react';
import { ImageProps, Image } from 'react-native';

interface StyledImageProps extends ImageProps {
    customStyle?: any;
}

const StyledImage = (props: StyledImageProps) => {
    const { customStyle } = props;
    return <Image style={customStyle} {...props} />;
};

export default React.memo(StyledImage);
