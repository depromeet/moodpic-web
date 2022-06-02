import { atom } from 'recoil';
import { PostRequestType, PostResponseType } from '@/shared/type/post';

export const createPostRequestState = atom<PostRequestType>({
  key: 'createPostRequestState',
  default: {
    firstCategory: '',
    secondCategory: '',
    content: '',
    tags: [],
    disclosure: true,
    folderId: undefined,
  },
});

export const createPostResponseState = atom<PostResponseType>({
  key: 'createPostResponseState',
  default: {
    postId: '',
  },
});

export const isDefaultFolderSelectedState = atom<boolean>({
  key: 'isDefaultFolderSelectedState',
  default: false,
});
