import { Post, PostListRequest, PostListResponse, CategoryFolder } from '@/shared/type/post';
import { PostResponseType } from '@/shared/type/postResponse';
import fetcher from '@/shared/utils/fetcher';

export interface PostSimple extends Omit<Post, 'id'> {
  postId: string;
}

const postService = {
  getPosts: async (): Promise<PostListResponse> => {
    const { data } = await fetcher('get', '/api/v1/posts');

    return {
      posts: data,
      totalCount: data.length,
    };
  },
  getPostById: async (id: string): Promise<Post> => {
    const { data } = await fetcher('get', `/api/v1/posts/${id}`);

    return data;
  },
  getIncompletedPosts: async (): Promise<Post[]> => {
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
  updatePost: async ({ id, postData }: { id: string; postData: PostResponseType }): Promise<PostResponseType> => {
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
  getPostsByFolderId: async ({ folderId, page, size }: PostListRequest): Promise<PostListResponse> => {
    const { data } = await fetcher('get', `/api/v1/folders/posts/${folderId}?page=${page}&size=${size}`);

    return {
      posts: data.posts.map((post: PostSimple) => ({
        ...post,
        id: post.postId,
      })),
      totalCount: data.totalCount,
      folderName: data.folderName,
    };
  },
  deletePostById: async (ids: string[]): Promise<PostListResponse> => {
    const idsString = ids.join(',');
    const { data } = await fetcher('delete', `/api/v1/posts?postIds=${idsString}`);

    return data;
  },
  getPostsByCategories: async (): Promise<CategoryFolder[]> => {
    const { data } = await fetcher('get', '/api/v1/posts/categories');

    return data;
  },
  getPostsByCategoryId: async ({ categoryId, page, size }: PostListRequest): Promise<PostListResponse> => {
    const { data } = await fetcher('get', `/api/v1/posts/categories/${categoryId}?page=${page}&size=${size}`);

    return {
      posts: data.posts.map((post: PostSimple) => ({
        ...post,
        id: post.postId,
      })),
      totalCount: data.totalCount,
    };
  },
};

export default postService;
