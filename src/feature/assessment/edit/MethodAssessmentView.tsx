import { createTransaction } from 'api/assessment';
import Images from 'assets/images';
import { StyledButton, StyledIcon, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import { METHOD_ASSESSMENT, staticValue } from 'feature/staticData';
import { ASSESSMENT_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/logger';
import ItemMethodView from '../components/ItemMethodView';
import SlideAssessmentView from '../components/SlideAssessmentView';

const MethodAssessmentView = (data: any) => {
    const { route } = data;
    const { params } = route;
    const modal = useModal();
    const [indexActive, setIndexActive] = useState(0);
    const [isPreview, setIsPreview] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         const countJoinMethod = await countJoinFunction(staticValue.KEY_SHOW_SLIDE_METHOD);
    //         if (Number(countJoinMethod) <= staticValue.DEFAULT_VALUE) {
    //             setIsPreview(true);
    //         }
    //     })();
    // }, []);
    const handleMethodAssessment = async () => {
        // const countClick = await countJoinFunction(staticValue.KEY_SHOW_MODAL_TUTORIAL);
        // if (Number(countClick) <= staticValue.DEFAULT_VALUE) {
        modal.show({
            children: (
                <SlideAssessmentView
                    onClose={() =>
                        modal.dismiss(undefined, async () => {
                            handlePrepareTime();
                        })
                    }
                />
            ),
        });
        // }
        // else {
        //     handlePrepareTime();
        // }
    };
    const handlePrepareTime = async () => {
        try {
            const typeReview = indexActive + staticValue.DEFAULT_VALUE;
            const dataTransaction = {
                productId: params.productId,
                type: typeReview,
            };
            const result = await createTransaction(dataTransaction);
            logger(result?.data);
            if (result) {
                navigate(ASSESSMENT_ROUTE.PREPARE_TIME, {
                    transactionId: result?.data.transactionId,
                    typeReview,
                    timeCount: result?.data?.timeout,
                });
            }
        } catch (error) {
            AlertMessage(error);
        }
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={'assessment.titleMethod'} />
            <View style={styles.viewMethod}>
                {METHOD_ASSESSMENT.map((item, index) => (
                    <ItemMethodView
                        key={index}
                        iconMethod={index === indexActive ? item.iconActive : item?.icon}
                        nameMethod={item.name}
                        size={item.size}
                        isActive={index === indexActive}
                        isRecommend={!index}
                        onPress={() => setIndexActive(index)}
                    />
                ))}
                {isPreview && (
                    <ImageBackground source={Images.photo.assessment.imgPreview} style={styles.imgPreview}>
                        <StyledTouchable onPress={() => setIsPreview(false)} customStyle={styles.buttonClosePreview}>
                            <StyledIcon source={Images.icons.close} size={8} customStyle={styles.iconClosePreview} />
                        </StyledTouchable>
                    </ImageBackground>
                )}
                <StyledButton
                    title={'assessment.start'}
                    onPress={handleMethodAssessment}
                    customStyle={styles.buttonStart}
                />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    viewMethod: {
        marginTop: 39,
    },
    buttonStart: {
        bottom: -104,
        position: 'absolute',
    },
    imgPreview: {
        width: '287@s',
        height: '103@s',
        marginLeft: 20,
        position: 'absolute',
        bottom: '-103@s',
        zIndex: 10,
    },
    iconClosePreview: {
        margin: 5,
    },
    buttonClosePreview: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 10,
    },
});

export default MethodAssessmentView;
