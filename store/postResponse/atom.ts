import { atom } from 'recoil';
import { PostResponseType } from '@/shared/type/postResponse';

export const postResponseState = atom<PostResponseType>({
  key: 'postResponseState',
  default: {
    firstCategory: '',
    secondCategory: '',
    content: '',
    tags: [],
    disclosure: false,
    folderId: 1,
  },
});
