import Error from 'next/error';
import { useQuery } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import fetcher from '@/shared/utils/fetcher';

export interface FirstCategoryResponse {
  categoryId: number;
  categoryName: string;
  description: string;
  image: string;
}
const fetchFirstCategory = async (): Promise<FirstCategoryResponse[]> => {
  const { data } = await fetcher('get', '/api/v1/firstcategory');

  return data;
};

const useFirstCategoryQuery = () => {
  return useQuery<FirstCategoryResponse[], Error>(
    QUERY_KEY.GET_FIRST_CATEGORY,
    fetchFirstCategory,
  );
};

export { useFirstCategoryQuery, fetchFirstCategory };
