import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchedPostsQuery } from '../../../hooks/apis';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import NavHeader from '../../../components/TagSearch/NavHeader/NavHeader';
import SearchField from '../../../components/TagSearch/SearchField/SearchField';
import useSearchForm from '../../../hooks/useSearchForm';
import { CommonBottomSheetContainer, CommonIconButton } from '../../../components/Common';
import useBottomSheet from '../../../hooks/useBottomSheet';
import OrderTypeSelectSheet from '@/components/TagSearch/OrderTypeSelectSheet/OrderTypeSelectSheet';
import { TAG_SEARCH_ORDER_TYPE, TagSearchOrderType } from '../../../shared/constants/tagSearch';
import PostItem from '../../../components/Post/PostItem/PostItem';
import postService from '../../../service/apis/postService';
import { Post } from '../../../shared/type/post';

const SearchedResultByTag = () => {
  const router = useRouter();
  const searchedTag = router.query.searchedTag as string;
  const { searchResult, submitSearchResult, changeSearchResult, addSearchedRecentTags } = useSearchForm();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [orderType, setOrderType] = useState<TagSearchOrderType>(TAG_SEARCH_ORDER_TYPE.NEWEST);
  const {
    data: searchedPosts,
    isLoading: isLoadingSearchedPosts,
    refetch: refetchSearchedPosts,
  } = useSearchedPostsQuery({ orderType, searchedTag });

  const ORDER_TYPE_OPTIONS_LENGTH = 2;

  const changeOrderTypeAndToggleSheet = (orderType: TagSearchOrderType) => {
    setOrderType(orderType);
    toggleSheet();
  };

  useEffect(() => {
    if (searchedTag) {
      refetchSearchedPosts();
    }
  }, [orderType]);

  // TODO
  if (!searchedPosts) return <div>404</div>;

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
        <SearchedPostsLengthInformation>총 {searchedPosts.length}개</SearchedPostsLengthInformation>
        <SelectOrderTypeButtonContainer onClick={toggleSheet}>
          <SelectOrderTypeButton>
            {orderType === TAG_SEARCH_ORDER_TYPE.NEWEST ? '최신순' : '인기순'}
          </SelectOrderTypeButton>
          <CommonIconButton iconName="circleDown" />
        </SelectOrderTypeButtonContainer>
      </Header>
      <SearchedPostsContainer>
        {searchedPosts.map((searchedPost) => (
          <PostItem
            key={searchedPost.id}
            post={searchedPost}
            onClick={async () => {
              try {
                await postService.increasePostViewCounts(searchedPost.id);
              } catch (error) {
                // TODO
                alert('go 404');
              }

              router.push(`/posts/${searchedPost.id}`);
            }}
          />
        ))}
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
