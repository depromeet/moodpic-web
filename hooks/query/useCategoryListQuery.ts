import Error from 'next/error';
import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import fetcher from '@/shared/utils/fetcher';

export interface CategoryListResponse {
  categoryId: number;
  categoryName: string;
  name: string;
  image: string;
}
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
