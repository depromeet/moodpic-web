import { Post } from '@/shared/type/post';
import { PostResponseType } from '@/shared/type/postResponse';
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
  createPost: async (postData: PostResponseType): Promise<PostResponseType> => {
    const { data } = await fetcher('post', `/api/v1/posts`, postData);

    return data;
  },
};

export default postService;
