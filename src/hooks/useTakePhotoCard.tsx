import ModalizeManager from 'components/base/modal/ModalizeManager';
import ModalCameraCardView from 'feature/assessment/components/ModalCameraCardView';
import { staticValue, TYPE_CARD } from 'feature/staticData';
import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { filterCardByType } from 'utilities/convert';

const useTakePhotoCard = (cardId: number, numPhotos = staticValue.DEFAULT_VALUE) => {
    const modalize = ModalizeManager();
    const {
        FRONT_BACK_CARD: { FRONT, BACK },
    } = TYPE_CARD;
    const { IDCards } = useSelector((state: any) => state.userInfo.user);
    const specificCard: any = useMemo(() => filterCardByType(IDCards, cardId)[0] || {}, [IDCards]);
    const [disable, setDisable] = useState(true);
    const [imageCard, setImageCard] = useState({
        frontImage: specificCard?.memberImages?.[0] || {},
        backImage: specificCard?.memberImages?.[1] || {},
    });
    const { frontImage, backImage } = imageCard;

    useEffect(() => {
        setDisable(!(numPhotos > staticValue.DEFAULT_VALUE ? frontImage?.URL && backImage?.URL : frontImage?.URL));
    }, [imageCard]);

    const getUrlCard = (dataImage = {}, idImage: string) => {
        setImageCard({ ...imageCard, [idImage]: dataImage });
    };

    const showModalCard = (chooseFront = true) => {
        Keyboard.dismiss();
        modalize.show(1, <ModalCameraCardView idImage={chooseFront ? FRONT : BACK} getUrl={getUrlCard} />, {});
    };
    return {
        frontImage,
        backImage,
        showModalCard,
        disable,
    };
};

export default useTakePhotoCard;
