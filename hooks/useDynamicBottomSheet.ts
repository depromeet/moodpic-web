import { MouseEvent, ReactNode, useCallback, useState } from 'react';

const MAX_SHOW_LIST_ITEM = 7;
const HEADER_HEIGHT = 88;
const LIST_ITEM_HEIGHT = 61.8;
const LIST_BOTTOM_HEIGHT = 58;
const NEW_CREATE_FOLDER = 47;

interface DynamicBottomSheet {
  children: ReactNode;
  height: number;
  closeCallback?: () => void;
}

const useDynamicBottomSheet = () => {
  const [isVisibleSheet, setVisibleSheet] = useState(false);
  const [bottomSheetRender, setBottomSheetRender] = useState<DynamicBottomSheet>({
    height: 0,
    children: null,
    closeCallback: undefined,
  });

  const calcBottomSheetHeight = ({ folderSize, hasHeader = false }: { folderSize: number; hasHeader?: boolean }) => {
    if (folderSize === 1)
      return hasHeader
        ? HEADER_HEIGHT + NEW_CREATE_FOLDER + LIST_ITEM_HEIGHT + LIST_BOTTOM_HEIGHT
        : NEW_CREATE_FOLDER + LIST_ITEM_HEIGHT + LIST_BOTTOM_HEIGHT;
    if (folderSize > MAX_SHOW_LIST_ITEM) return 530;
    const contentHeight = LIST_ITEM_HEIGHT * folderSize + LIST_BOTTOM_HEIGHT;
    return hasHeader ? HEADER_HEIGHT + contentHeight : contentHeight;
  };

  const toggleSheet = () => {
    setVisibleSheet((isVisibleSheet) => !isVisibleSheet);
  };

  const onClose = useCallback(
    (event?: MouseEvent<HTMLElement | HTMLButtonElement>) => {
      event && event.stopPropagation();
      setVisibleSheet(false);
      typeof bottomSheetRender.closeCallback === 'function' && bottomSheetRender.closeCallback();
    },
    [setVisibleSheet, bottomSheetRender],
  );

  const updateBottomSheetRender = useCallback(
    (render: DynamicBottomSheet) => {
      setBottomSheetRender({
        height: render.height,
        children: render.children ?? null,
        closeCallback: render.closeCallback,
      });

      setVisibleSheet(!!render);
    },
    [setVisibleSheet],
  );

  return {
    isVisibleSheet,
    toggleSheet,
    calcBottomSheetHeight,
    onCloseBottomSheet: onClose,
    bottomSheetRender,
    setBottomSheetRender: updateBottomSheetRender,
  };
};

export default useDynamicBottomSheet;
