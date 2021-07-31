import { Themes } from 'assets/themes';
import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ScaledSheet } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface StyledImageProps extends FastImageProps {
    customStyle?: any;
}

const StyledFastImage = (props: StyledImageProps) => {
    const { customStyle } = props;
    const [loading, setLoading] = useState(false);
    return (
        <View>
            {loading && (
                <View style={[styles.loading, customStyle]}>
                    <SkeletonPlaceholder speed={1500} backgroundColor={Themes.COLORS.imageLoading}>
                        <SkeletonPlaceholder.Item width={customStyle.width} height={customStyle.height} />
                    </SkeletonPlaceholder>
                </View>
            )}
            <FastImage
                style={{ ...customStyle, display: loading ? 'none' : 'flex' }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                {...props}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(StyledFastImage);
