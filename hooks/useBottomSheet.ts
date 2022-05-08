import { useState } from 'react';

const MAX_SHOW_LIST_ITEM = 7;
const HEADER_HEIGHT = 66;
const LIST_ITEM_HEIGHT = 61.8;
const LIST_BOTTOM_HEIGHT = 58;

export default function useBottomSheet() {
  const [isVisibleSheet, setVisibleSheet] = useState(false);

  const calcBottomSheetHeight = (folderDataLength: number) => {
    if (folderDataLength > MAX_SHOW_LIST_ITEM) return 530;
    return (
      HEADER_HEIGHT + LIST_ITEM_HEIGHT * folderDataLength + LIST_BOTTOM_HEIGHT
    );
  };

  const toggleSheet = () => {
    setVisibleSheet(!isVisibleSheet);
  };

  return {
    calcBottomSheetHeight,
    toggleSheet,
    isVisibleSheet,
  };
}
