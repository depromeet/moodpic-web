import Error from 'next/error';
import { useQuery } from 'react-query';
import { apiClient } from '@/shared/api/apiClient';
import QueryKey from '@/shared/constants/queryKey';

// TODO: 예시 interface -> 이후 제거
interface Post {
  id: number;
  title: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get('/posts');

  return data;
};

const usePostsQuery = () => {
  return useQuery<Post[], Error>(QueryKey.GET_POSTS, fetchPosts);
};

export { usePostsQuery, fetchPosts };
