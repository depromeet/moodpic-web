import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { CommonTagButton } from '../../components/Common';

import PopularTagItem from '../../components/TagSearch/PopularTagItem/PopularTagItem';
import NavHeader from '../../components/TagSearch/NavHeader/NavHeader';
import SearchField from '../../components/TagSearch/SearchField/SearchField';
import useSearchForm from '../../hooks/useSearchForm';
import { getLocalStorageValue, setLocalStorageValue } from '../../shared/utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../../shared/constants/localStorageKey';
import { usePopularTags } from '../../hooks/apis';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const [searchedRecentTags, setSearchedRecentTags] = useState<string[]>(
    () => getLocalStorageValue(LOCAL_STORAGE_KEY.SEARCHED_RECENT_TAGS) || [],
  );
  const { data: popularTags, isLoading: isPopularTagsLoading } = usePopularTags();
  const { searchResult, searchByTag, changeSearchResult } = useSearchForm();
  const resetRecentSearchedTags = () => {
    setLocalStorageValue(LOCAL_STORAGE_KEY.SEARCHED_RECENT_TAGS, []);
    setSearchedRecentTags([]);
  };

  const MIN_RANK = 1;

  if (searchedRecentTags == undefined || popularTags == undefined || isPopularTagsLoading) return <div>로딩중</div>;

  return (
    <Container>
      <NavHeader onClickLeftIcon={() => router.push('/')} />
      <SearchFieldContainer>
        <SearchField value={searchResult} onChange={changeSearchResult} onSubmit={searchByTag} />
      </SearchFieldContainer>
      <RecentTagsContainer>
        <RecentTagSearchContainer>
          <LogoTitle>최근 검색 태그</LogoTitle>
          <RemoveSearchedResultButton onClick={resetRecentSearchedTags}>검색 기록 삭제</RemoveSearchedResultButton>
        </RecentTagSearchContainer>
        <TagButtonWrap>
          {searchedRecentTags.length === 0 ? (
            <NoneTagMessage>최근 검색 태그 기록이 없어요.</NoneTagMessage>
          ) : (
            searchedRecentTags.map((tagTitle, index) => (
              <TagButtonContainer key={`tag-button-${index}`} onClick={() => searchByTag(tagTitle)}>
                <CommonTagButton>#{tagTitle}</CommonTagButton>
              </TagButtonContainer>
            ))
          )}
        </TagButtonWrap>
      </RecentTagsContainer>
      <PopularTagsContainer>
        <LogoTitle>인기 태그</LogoTitle>
        <PopularTagItemsContainer>
          {popularTags.length === 0 ? (
            <NoneTagMessage>인기 태그가 없어요.</NoneTagMessage>
          ) : (
            popularTags.map(({ tag }, index) => (
              <PopularTagItem
                key={`id-${index}`}
                rank={MIN_RANK + index}
                title={tag}
                onClick={() => searchByTag(tag)}
              />
            ))
          )}
        </PopularTagItemsContainer>
      </PopularTagsContainer>
    </Container>
  );
};

const SearchFieldContainer = styled.div`
  width: 100%;
  align-items: center;
`;

const TagButtonContainer = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  padding: 0;
`;

const RecentTagsContainer = styled.div`
  margin-bottom: 3.6rem;
`;

const RecentTagSearchContainer = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoTitle = styled.h4`
  ${theme.fonts.h4};
  color: ${theme.colors.white};
`;

const RemoveSearchedResultButton = styled.button`
  height: 1.4rem;
  color: ${theme.colors.gray4};
  ${theme.fonts.h6};
  cursor: pointer;
`;

const TagButtonWrap = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 1rem;
`;

const NoneTagMessage = styled.h6`
  margin-bottom: 1.4rem;
  ${theme.fonts.h6};
  color: ${theme.colors.gray4};
`;

const PopularTagsContainer = styled.div``;

const PopularTagItemsContainer = styled.div`
  margin-top: 1.2rem;
`;

export default Search;
