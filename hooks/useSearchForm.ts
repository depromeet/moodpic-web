import { ChangeEvent, FormEvent, useState } from 'react';
import { getLocalStorageValue, setLocalStorageValue } from '../shared/utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../shared/constants/localStorageKey';
import { useRouter } from 'next/router';
import useToast from './useToast';
import { ToastType } from '../shared/type/common';

const useSearchForm = () => {
  const [searchResult, setSearchResult] = useState<string>('');
  const notify = useToast();
  const router = useRouter();

  const changeSearchResult = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(event.target.value);
  };

  const submitSearchResult = (event: FormEvent, searchResult: string) => {
    event.preventDefault();
    if (!searchResult) {
      notify({
        type: ToastType.ERROR,
        message: '검색어를 입력해 주세요.',
      });
      return;
    }
    router.push(`/search/result/${searchResult}`);
  };

  const addSearchedRecentTags = () => {
    const MAX_SEARCHED_RECENT_TAGS_LENGTH = 8;
    const currentSearchedRecentTags = getLocalStorageValue(LOCAL_STORAGE_KEY.SEARCHED_RECENT_TAGS) || [];

    const newSearchedRecentTags = [...currentSearchedRecentTags, searchResult];

    if (newSearchedRecentTags.length > MAX_SEARCHED_RECENT_TAGS_LENGTH) {
      newSearchedRecentTags.shift();
    }

    setLocalStorageValue(LOCAL_STORAGE_KEY.SEARCHED_RECENT_TAGS, newSearchedRecentTags);
  };

  return {
    searchResult,
    submitSearchResult,
    changeSearchResult,
    addSearchedRecentTags,
  };
};

export default useSearchForm;
