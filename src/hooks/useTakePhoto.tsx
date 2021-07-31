import ModalizeManager from 'components/base/modal/ModalizeManager';
import ModalCameraView from 'feature/assessment/components/ModalCameraView';
import ModalCertificateView from 'feature/assessment/components/ModalCertificateView';
import { staticValue } from 'feature/staticData';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';

const useTakePhoto = (customOnClose?: () => void) => {
    const [imageProduct, setImageProduct] = useState<any>({ whole: {}, logo: {} });
    const modalize = ModalizeManager(customOnClose);

    const getUrlProduct = (dataImage: any, idImage: number) => {
        if (!idImage) {
            setImageProduct({ ...imageProduct, whole: dataImage });
        } else {
            setImageProduct({ ...imageProduct, logo: dataImage });
        }
    };
    const showModalPhoto = (id: number) => {
        Keyboard.dismiss();
        setTimeout(() => {
            modalize.show(
                1,
                <ModalCameraView
                    idImage={id}
                    getUrl={getUrlProduct}
                    customOnClose={customOnClose}
                    modalize={modalize}
                />,
                {},
            );
        }, staticValue.TIME_OUT_DISMISS);
    };
    const showModalCertificate = (id: number) => {
        Keyboard.dismiss();
        modalize.show(1, <ModalCertificateView idImage={id} getUrl={getUrlProduct} />, {});
    };
    return {
        showModalPhoto,
        imageProduct,
        showModalCertificate,
        setImageProduct,
    };
};

export default useTakePhoto;
