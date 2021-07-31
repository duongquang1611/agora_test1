import { uploadImage } from 'api/modules/api-app/general';
import AlertMessage from 'components/base/AlertMessage';
import ImagePicker from 'react-native-image-crop-picker';
import { logger } from 'utilities/helper';
import { checkCamera, checkPhoto } from 'utilities/permissions';

const MAX_HEIGHT = 800;
const MAX_WIDTH = 800;

const ImageUploaded = {
    pickImage: async (index: number) => {
        try {
            let localPath: any = '';
            if (index === 1) {
                await checkPhoto();
                localPath = await ImageUploaded.chooseImageFromGallery();
            } else if (index === 2) {
                await checkCamera();
                localPath = await ImageUploaded.chooseImageFromCamera();
            }
            const uri = await ImageUploaded.uploader(localPath.path);
            return uri;
        } catch (err) {
            logger(err);
            return null;
        }
    },

    chooseImageFromCamera: () =>
        ImagePicker.openCamera({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
        }),

    chooseImageFromGallery: () =>
        ImagePicker.openPicker({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            // compressImageQuality: 100,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
        }),

    uploader: async (localPath: any) => {
        const timeStamp = new Date().getTime();
        const formatImage: any = {
            uri: localPath,
            name: `${timeStamp}.jpeg`,
            type: 'image/jpeg',
        };
        const formData = new FormData();
        formData.append('files', formatImage);
        try {
            const uri = await uploadImage(formData);
            if (uri?.data.length > 0) {
                return uri;
            }
        } catch (err) {
            AlertMessage(err);
        }
        return {};
    },
};
export default ImageUploaded;
