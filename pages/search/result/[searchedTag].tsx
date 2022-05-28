import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchedPostsByNewest, useSearchedPostsByPopularity } from '../../../hooks/apis';
import SearchedPostItem from '../../../components/TagSearch/SearchedPostItem/SearchedPostItem';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import NavHeader from '../../../components/TagSearch/NavHeader/NavHeader';
import SearchField from '../../../components/TagSearch/SearchField/SearchField';
import useSearchForm from '../../../hooks/useSearchForm';
import { CommonBottomSheetContainer, CommonIconButton } from '../../../components/Common';
import useBottomSheet from '../../../hooks/useBottomSheet';
import OrderTypeSelectSheet from '@/components/TagSearch/OrderTypeSelectSheet/OrderTypeSelectSheet';
import { TAG_SEARCH_ORDER_TYPE, TagSearchOrderType } from '../../../shared/constants/tagSearch';

const SearchedResultByTag = () => {
  const router = useRouter();
  const { searchedTag } = router.query;
  const { data: searchedPostsByNewest, isLoading: isSearchedPostsByNewestLoading } = useSearchedPostsByNewest(
    String(searchedTag),
  );
  const { data: searchedPostsByPopularity, isLoading: isPopularityPostsByNewestLoading } = useSearchedPostsByPopularity(
    String(searchedTag),
  );
  const { searchResult, submitSearchResult, changeSearchResult, addSearchedRecentTags } = useSearchForm();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [orderType, setOrderType] = useState<TagSearchOrderType>(TAG_SEARCH_ORDER_TYPE.NEWEST);

  const ORDER_TYPE_OPTIONS_LENGTH = 2;

  const changeOrderTypeAndToggleSheet = (orderType: TagSearchOrderType) => {
    setOrderType(orderType);
    toggleSheet();
  };

  if (
    isSearchedPostsByNewestLoading ||
    isPopularityPostsByNewestLoading ||
    !searchedPostsByNewest ||
    !searchedPostsByPopularity
  )
    return <div>로딩중</div>;

  return (
    <>
      <NavHeader onClickLeftIcon={() => router.push('/search')} />
      <SearchFieldContainer>
        <SearchField
          value={searchResult}
          onChange={changeSearchResult}
          onSubmit={(event: FormEvent) => {
            submitSearchResult(event, searchResult);
            addSearchedRecentTags();
          }}
        />
      </SearchFieldContainer>
      <Header>
        <SearchedPostsLengthInformation>총 {searchedPostsByNewest.length}개</SearchedPostsLengthInformation>
        <SelectOrderTypeButtonContainer onClick={toggleSheet}>
          <SelectOrderTypeButton>
            {orderType === TAG_SEARCH_ORDER_TYPE.NEWEST ? '최신순' : '인기순'}
          </SelectOrderTypeButton>
          <CommonIconButton iconName="caretCircleDown" />
        </SelectOrderTypeButtonContainer>
      </Header>
      <SearchedPostsContainer>
        {(orderType === TAG_SEARCH_ORDER_TYPE.POPULARITY ? searchedPostsByPopularity : searchedPostsByNewest).map(
          (searchedPost) => (
            <SearchedPostItem key={searchedPost.id} searchedPost={searchedPost} />
          ),
        )}
      </SearchedPostsContainer>
      {isVisibleSheet && (
        <CommonBottomSheetContainer
          onClose={toggleSheet}
          BottomSheetHeight={calcBottomSheetHeight({ folderSize: ORDER_TYPE_OPTIONS_LENGTH })}
        >
          <OrderTypeSelectSheet onClickOption={changeOrderTypeAndToggleSheet} />
        </CommonBottomSheetContainer>
      )}
    </>
  );
};

export default SearchedResultByTag;

const Header = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-top: 2.3rem;
  margin-bottom: 2.4rem;
`;

const SearchFieldContainer = styled.div`
  width: 100%;
  align-items: center;
  margin: 1rem 1.8rem;
`;

const SelectOrderTypeButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  cursor: pointer;
`;

const SelectOrderTypeButton = styled.div`
  cursor: pointer;
  margin-right: 0.8rem;
  ${theme.fonts.h6}
  color: white;
`;

const SearchedPostsLengthInformation = styled.div`
  ${theme.fonts.h6}
  color: ${theme.colors.white}
`;

const SearchedPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
