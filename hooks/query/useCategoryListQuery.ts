import Error from 'next/error';
import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import fetcher from '@/shared/utils/fetcher';

type CategoryKeys = 'positive' | 'natural' | 'negative';

export interface CategoryListItemResponse {
  categoryId: number;
  categoryName: string;
  description: string;
  image: string;
}

type CategoryListResponse = {
  [key in CategoryKeys]: CategoryListItemResponse[];
};
const fetchCategoryList = async (): Promise<CategoryListResponse> => {
  const { data } = await fetcher('get', '/api/v1/category');

  return data;
};

const useCategoryListQuery = () => {
  return useQuery<CategoryListResponse, Error>(
    QUERY_KEY.GET_CATEGORY_LIST,
    fetchCategoryList,
  );
};

export { useCategoryListQuery, fetchCategoryList };
