import { PAGE_SIZE } from '@/shared/constants/common';
import { Post, PostListRequest, PostListResponse, CategoryFolder } from '@/shared/type/post';
import { PostRequestType } from '@/shared/type/post';
import fetcher from '@/shared/utils/fetcher';

export interface PostSimple extends Omit<Post, 'id'> {
  postId: string;
}

const postService = {
  getPosts: async (page = 0): Promise<PostListResponse> => {
    const { data } = await fetcher('get', `/api/v1/posts?page=${page}&size=${PAGE_SIZE}`);

    return {
      ...data,
      nextPage: page + 1,
      hasNext: data.totalCount - (page + 1) * PAGE_SIZE > 0,
    };
  },
  getPostById: async (id: string): Promise<Post> => {
    const { data } = await fetcher('get', `/api/v1/posts/${id}`);

    return data;
  },
  getIncompletedPosts: async (page = 0): Promise<Post[]> => {
    const { data } = await fetcher('get', `/api/v1/posts/temp?page=${page}&size=${PAGE_SIZE}`);

    return data;
  },
  createPost: async (postData: PostRequestType): Promise<PostRequestType> => {
    const { data } = await fetcher('post', `/api/v1/posts`, postData);

    return data;
  },
  updatePost: async ({ id, postData }: { id: string; postData: PostRequestType }): Promise<PostRequestType> => {
    const { secondCategory, content, tags, disclosure, folderId } = postData;
    const { data } = await fetcher('patch', `/api/v1/posts/${id}`, {
      secondCategory,
      content,
      tags,
      disclosure,
      folderId,
    });

    return data;
  },
  getPostsByFolderId: async ({ folderId, page = 0 }: PostListRequest): Promise<PostListResponse> => {
    const { data } = await fetcher('get', `/api/v1/folders/${folderId}/posts?page=${page}&size=${PAGE_SIZE}`);

    // TODO: 중복로직 리팩터링 예정입니다. 또는 API Response 예정..
    return {
      ...data,
      nextPage: page + 1,
      hasNext: data.totalCount - (page + 1) * PAGE_SIZE > 0,
      posts: data.posts.map((post: PostSimple) => ({
        ...post,
        id: post.postId,
      })),
    };
  },
  deletePostById: async (ids: string[]): Promise<PostListResponse> => {
    const idsString = ids.join(',');
    const { data } = await fetcher('delete', `/api/v1/posts?postIds=${idsString}`);

    return data;
  },
  getPostsByCategories: async (): Promise<CategoryFolder[]> => {
    const { data } = await fetcher('get', '/api/v1/posts/categories');

    return data.reverse();
  },
  getPostsByCategoryId: async ({ categoryId, page = 0 }: PostListRequest): Promise<PostListResponse> => {
    const { data } = await fetcher('get', `/api/v1/posts/categories/${categoryId}?page=${page}&size=${PAGE_SIZE}`);

    return {
      ...data,
      nextPage: page + 1,
      hasNext: data.totalCount - (page + 1) * PAGE_SIZE > 0,
      posts: data.posts.map((post: PostSimple) => ({
        ...post,
        id: post.postId,
      })),
    };
  },
  increasePostViewCounts: async (postId: string) => {
    await fetcher('patch', `/api/v1/posts/${postId}/views`);
  },
};

export default postService;
