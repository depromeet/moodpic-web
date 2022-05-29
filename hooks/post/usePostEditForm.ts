import { CONTENT_SEPARATOR } from '@/shared/constants/question';
import { postRequestState } from '@/store/postResponse/atom';
import { useRecoilState } from 'recoil';

const usePostEditForm = () => {
  const [selectedState, setSelectedState] = useRecoilState(postRequestState);
  const hasMultipleContent = selectedState.content.includes(CONTENT_SEPARATOR);

  const changePostForm = (key: string, value: boolean | string) => {
    setSelectedState({ ...selectedState, [key]: value });
  };

  const handleCategoryClick = (categoryName: string) => {
    changePostForm('secondCategory', categoryName);
  };

  return {
    selectedState,
    setSelectedState,
    hasMultipleContent,
    changePostForm,
    handleCategoryClick,
  };
};

export default usePostEditForm;
