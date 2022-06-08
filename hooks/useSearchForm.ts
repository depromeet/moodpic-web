import { ChangeEvent, FormEvent, useState } from 'react';
import { getLocalStorageValue, setLocalStorageValue } from '../shared/utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../shared/constants/localStorageKey';
import { useRouter } from 'next/router';

const useSearchForm = () => {
  const [searchResult, setSearchResult] = useState<string>('');
  const router = useRouter();

  const changeSearchResult = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchResult(event.target.value);
  };

  const submitSearchResult = (event: FormEvent, searchResult: string) => {
    event.preventDefault();
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
