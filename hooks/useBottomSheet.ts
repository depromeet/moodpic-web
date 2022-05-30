import { useState } from 'react';

const MAX_SHOW_LIST_ITEM = 7;
const HEADER_HEIGHT = 88;
const LIST_ITEM_HEIGHT = 61.8;
const LIST_BOTTOM_HEIGHT = 58;

export default function useBottomSheet() {
  const [isVisibleSheet, setVisibleSheet] = useState(false);

  const calcBottomSheetHeight = ({ folderSize, hasHeader }: { folderSize: number; hasHeader?: boolean }) => {
    if (folderSize > MAX_SHOW_LIST_ITEM) return 530;
    const contentHeight = LIST_ITEM_HEIGHT * folderSize + LIST_BOTTOM_HEIGHT;
    return hasHeader ? HEADER_HEIGHT + contentHeight : contentHeight;
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
