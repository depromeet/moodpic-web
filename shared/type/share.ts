import { Post } from './post';
import { CATEGORY_OPTIONS_INFO } from '../constants/share';

export interface SharePostRequest {
  receiverName: string;
  category: string;
  postId: Post['id'];
}

export interface SharePostResponseType {
  link: string;
}

export interface GetSharedPostResponse {
  receiverName: string;
  category: keyof typeof CATEGORY_OPTIONS_INFO;
  content: string;
  senderName: string;
}
