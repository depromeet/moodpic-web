import { useCallback, useState } from 'react';
import { useInput } from '@/hooks/useInput';

export const useTags = () => {
  const [tagValue, onChangeTagValue, setTagValue] = useInput('');
  const [tagList, setTagList] = useState<string[]>([]);

  const MAX_TAG_LIST_LENGTH = 5;

  const calcDeduplicatedTagList = useCallback(() => {
    const deduplicatedTagList = Array.from(new Set(tagList.concat(tagValue)));
    return [...deduplicatedTagList];
  }, [tagList, tagValue]);

  const onClickRightSideIcon = useCallback(() => {
    if (tagList.length < MAX_TAG_LIST_LENGTH && !!tagValue.trim()) {
      setTagList(calcDeduplicatedTagList);
      setTagValue('');
    }
  }, [tagValue, tagList, setTagValue, calcDeduplicatedTagList]);

  const onDeleteTag = useCallback(
    (index: number) => () => {
      setTagList(tagList.filter((_, i: number) => i !== index));
    },
    [tagList],
  );

  const onKeyPressEnter = useCallback(
    (event) => {
      if (event.key === 'Enter' && !!tagValue.trim() && tagList.length < MAX_TAG_LIST_LENGTH) {
        setTagList(calcDeduplicatedTagList);
        setTagValue('');
      }
    },
    [tagValue, tagList.length, calcDeduplicatedTagList, setTagValue],
  );

  return {
    tagList,
    setTagList,
    tagValue,
    onChangeTagValue,
    onDeleteTag,
    onKeyPressEnter,
    onClickRightSideIcon,
  };
};
