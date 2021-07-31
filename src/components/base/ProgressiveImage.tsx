import { staticValue } from 'feature/staticData';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ProgressiveImageProps {
    URL50x50?: string;
    URL: string;
    style: any;
}

const ProgressiveImage: FunctionComponent<ProgressiveImageProps> = (props: ProgressiveImageProps) => {
    const { DEFAULT_IMAGE } = staticValue;
    const { URL50x50 = DEFAULT_IMAGE, URL, style } = props;
    const [thumbnailAnimated] = useState(new Animated.Value(0));
    const [imageAnimated] = useState(new Animated.Value(0));
    const [error, setError] = useState(false);

    useEffect(() => {
        !!URL && setError(false);
    }, [URL]);

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={[style, styles.containerImage]}>
            {error ? (
                <Image {...props} source={{ uri: DEFAULT_IMAGE }} style={style} />
            ) : (
                <>
                    <Animated.Image
                        {...props}
                        source={{ uri: URL50x50 }}
                        style={[style, { opacity: thumbnailAnimated }]}
                        onLoad={handleThumbnailLoad}
                        blurRadius={1}
                    />
                    <Animated.Image
                        {...props}
                        source={{ uri: URL }}
                        onError={() => setError(true)}
                        style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                        onLoad={onImageLoad}
                    />
                </>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    containerImage: {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
});

export default ProgressiveImage;
