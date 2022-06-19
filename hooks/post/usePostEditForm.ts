import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { createPostRequestState } from '@/store/post/atom';

const usePostEditForm = () => {
  const [selectedState, setSelectedState] = useRecoilState(createPostRequestState);
  const resetSelectedState = useResetRecoilState(createPostRequestState);
  const hasMultipleContent = selectedState.content.includes(CONTENT_SEPARATOR);

  const changePostForm = (key: string, value: boolean | string) => {
    setSelectedState({ ...selectedState, [key]: value });
  };

  useEffect(() => {
    return () => {
      resetSelectedState();
    };
  }, []);

  return {
    selectedState,
    setSelectedState,
    hasMultipleContent,
    changePostForm,
  };
};

export default usePostEditForm;
