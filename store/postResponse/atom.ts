import { atom } from 'recoil';
import { PostResponseType } from '@/shared/type/postResponse';

export const postRequestState = atom<PostResponseType>({
  key: 'postRequestState',
  default: {
    firstCategory: '',
    secondCategory: '',
    content: '',
    tags: [],
    disclosure: true,
    folderId: undefined,
  },
});

export const isDefaultFolderSelectedState = atom<boolean>({
  key: 'isDefaultFolderSelectedState',
  default: false,
});
