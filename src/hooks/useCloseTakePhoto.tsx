import { useEffect } from 'react';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlacklist } from 'app-redux/blacklist/actions';

const useCloseTakePhoto = (modal = ModalizeManager(), onClose?: () => void) => {
    const { openingNotify } = useSelector((state: any) => state.blacklist);
    const dispatch = useDispatch();
    useEffect(() => {
        if (openingNotify) {
            onClose?.();
            modal.dismiss(1);
            dispatch(updateBlacklist({ openingNotify: false }));
        }
    }, [openingNotify]);
};

export default useCloseTakePhoto;
