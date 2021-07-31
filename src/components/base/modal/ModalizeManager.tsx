/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import * as React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { Modalize } from 'react-native-modalize';
import { wait } from 'utilities/helper';
import Metrics from 'assets/metrics';
import { verticalScale } from 'react-native-size-matters';

// array to control modals
let modalControl: any[] = [];

const ModalizeManager = (customOnClose?: () => void) => {
    const modalRef = React.createRef<any>();

    const show = (id: any, element: any, props: any) => {
        if (!modalControl.find((e) => e.id === id)) {
            const sibling = new RootSiblings(
                (
                    <Modalize
                        ref={modalRef}
                        onClosed={() => {
                            dismiss(1);
                            customOnClose?.();
                        }}
                        disableScrollIfPossible={true}
                        modalHeight={Metrics.screenHeight - 50}
                        scrollViewProps={{
                            scrollEnabled: false,
                        }}
                        panGestureEnabled={false}
                        withHandle={false}
                        {...props}
                    >
                        {element}
                    </Modalize>
                ),
                () => {
                    modalRef?.current?.open();
                    const newRef = { ...modalRef };
                    modalControl.push({
                        id,
                        ref: newRef,
                        element: sibling,
                        props,
                    });
                },
            );
        } else {
            wait(200).then(() => {
                modalRef?.current?.open();
            });
        }
    };

    const dismiss = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { ref, element } = item;
            ref?.current?.close();
            // destroy id
            const arr_filter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arr_filter];
            wait(200).then(() => {
                element.destroy();
            });
        }
    };

    const update = (id: any, component: any, props: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            item.element.update(
                <Modalize ref={modalRef} onClosed={() => dismiss(id)} withHandle={false} {...item.props} {...props}>
                    {component}
                </Modalize>,
            );
        }
    };

    const dismissAll = () => {
        modalControl.forEach((item) => {
            const { element } = item;
            element?.destroy();
        });
    };

    const destroySpecificId = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { element } = item;
            element?.destroy();
            // destroy id
            const arr_filter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arr_filter];
        }
    };
    return { show, dismissAll, dismiss, update };
};

export default ModalizeManager;
