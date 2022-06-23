import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchedPostsQuery } from '../../../hooks/apis';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import NavHeader from '../../../components/TagSearch/NavHeader/NavHeader';
import SearchField from '../../../components/TagSearch/SearchField/SearchField';
import useSearchForm from '../../../hooks/useSearchForm';
import { CommonBottomSheetContainer, CommonIconButton } from '../../../components/Common';
import useBottomSheet from '../../../hooks/useBottomSheet';
import { TAG_SEARCH_ORDER_TYPE, TagSearchOrderType } from '../../../shared/constants/tagSearch';
import PostItem from '../../../components/Post/PostItem/PostItem';
import postService from '../../../service/apis/postService';
import BottomSheetList from '../../../components/BottomSheetList/BottomSheetList';
import ListEmpty from '../../../public/images/list-empty.png';
import ImageMessage from '../../../components/ImageMessage/ImageMessage';

const SearchedResultByTag = () => {
  const router = useRouter();
  const searchedTag = router.query.tag as string;
  const { searchResult, changeSearchResult, searchByTag, setSearchResult } = useSearchForm();
  const { isVisibleSheet, toggleSheet, calcBottomSheetHeight } = useBottomSheet();
  const [orderType, setOrderType] = useState<TagSearchOrderType>(TAG_SEARCH_ORDER_TYPE.NEWEST);
  const {
    data: searchedPosts,
    isLoading: isLoadingSearchedPosts,
    refetch: refetchSearchedPosts,
  } = useSearchedPostsQuery({ orderType, searchedTag });

  const bottomSheetItems = [
    {
      label: '최신순',
      onClick: () => {
        setOrderType(TAG_SEARCH_ORDER_TYPE.NEWEST);
        toggleSheet();
      },
    },
    {
      label: '인기순',
      onClick: () => {
        setOrderType(TAG_SEARCH_ORDER_TYPE.POPULARITY);
        toggleSheet();
      },
    },
  ];

  useEffect(() => {
    setSearchResult(searchedTag);
    refetchSearchedPosts();
  }, [orderType, searchedTag]);

  if (isLoadingSearchedPosts) return <div>로딩중</div>;

  if (!searchedPosts) return <div>404</div>;

  return (
    <>
      <NavHeader onClickLeftIcon={() => router.push('/search')} />
      <SearchFieldContainer>
        <SearchField
          value={searchResult}
          onChange={changeSearchResult}
          onSubmit={searchByTag}
          onClickRightSideIcon={() => setSearchResult('')}
        />
      </SearchFieldContainer>
      <Header>
        <SearchedPostsLengthInformation>총 {searchedPosts.length}개</SearchedPostsLengthInformation>
        <SelectOrderTypeButtonContainer onClick={toggleSheet}>
          <SelectOrderTypeButton>
            {orderType === TAG_SEARCH_ORDER_TYPE.NEWEST ? '최신순' : '인기순'}
          </SelectOrderTypeButton>
          <CommonIconButton iconName="circledown" />
        </SelectOrderTypeButtonContainer>
      </Header>
      {searchedPosts.length === 0 && (
        <ImageMessage src={ListEmpty} alt="기록이 없어요.">
          검색결과가 없어요.
        </ImageMessage>
      )}
      <SearchedPostsContainer>
        {searchedPosts.map((searchedPost) => (
          <PostItem
            key={searchedPost.id}
            post={searchedPost}
            supportsTag={true}
            isMine={searchedPost.my}
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
          onClose={() => toggleSheet()}
          bottomSheetHeight={calcBottomSheetHeight({ folderSize: bottomSheetItems.length })}
        >
          <BottomSheetList items={bottomSheetItems} />
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

const SearchFieldContainer = styled.div``;

const SelectOrderTypeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SelectOrderTypeButton = styled.div`
  cursor: pointer;
  margin-right: 0.8rem;
  line-height: 2.4rem;
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
