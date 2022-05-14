import { Post } from '@/shared/type/post';
import fetcher from '@/shared/utils/fetcher';

const postService = {
  getPosts: async (): Promise<Post[]> => {
    const { data } = await fetcher('get', '/api/v1/posts');

    return data;
  },
  getPostById: async (id: number): Promise<Post> => {
    const { data } = await fetcher('get', `/api/v1/posts/${id}`);

    return data;
  },
  getIncompletePosts: async (): Promise<Post[]> => {
    const { data } = await fetcher('get', '/api/v1/posts/temp');

    return data;
  },
  getAllPosts: async (): Promise<Post[]> => {
    const { data } = await fetcher('get', '/api/v1/posts/all');

    return data;
  },
};

export default postService;
