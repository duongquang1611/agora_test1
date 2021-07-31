import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SLIDE_ASSESSMENT } from 'feature/staticData';
import { StyledIcon, StyledTouchable } from 'components/base';
import Images from 'assets/images';
import ItemSlideView from './ItemSlideView';

interface SlideProps {
    onClose(): void;
}

const SlideAssessmentView = (props: SlideProps) => {
    const { onClose } = props;
    const [indexSlide, setIndexSlide] = useState(0);
    const renderItem = ({ item }: any) => <ItemSlideView slide={item} />;
    return (
        <>
            {indexSlide ? (
                <StyledTouchable customStyle={styles.buttonClose} onPress={onClose}>
                    <StyledIcon source={Images.icons.close} size={17} />
                </StyledTouchable>
            ) : null}
            <View style={styles.container}>
                <Carousel
                    data={SLIDE_ASSESSMENT}
                    renderItem={renderItem}
                    onSnapToItem={(i: number) => setIndexSlide(i)}
                    sliderWidth={Metrics.screenWidth - 70}
                    itemWidth={Metrics.screenWidth - 70}
                    autoplay={false}
                />
                <Pagination
                    dotsLength={SLIDE_ASSESSMENT.length}
                    activeDotIndex={indexSlide}
                    inactiveDotOpacity={1}
                    inactiveDotScale={1}
                    inactiveDotColor={Themes.COLORS.silver}
                    dotColor={Themes.COLORS.secondary}
                />
            </View>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: Metrics.screenWidth - 70,
        height: '369@s',
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonClose: {
        position: 'absolute',
        top: -37,
        right: 3,
        zIndex: 100,
    },
});

export default SlideAssessmentView;
