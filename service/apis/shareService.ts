import fetcher from '../../shared/utils/fetcher';
import { Post } from '../../shared/type/post';
import posts from '../../pages/posts';
import { CATEGORY_OPTIONS_INFO, CategoryOptionsInfo } from '../../shared/constants/share';

//TODO: ServerState 관련 타입 위치 고민이 필요할 것 같음
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

const shareService = {
  sharePost: async ({ receiverName, category, postId }: SharePostRequest) => {
    const body: SharePostRequest = { receiverName, category, postId };

    const { data } = await fetcher('post', '/api/v1/sharing', body);

    return data;
  },

  getSharedPost: async (link: string): Promise<GetSharedPostResponse> => {
    const { data } = await fetcher('get', '/api/v1/sharing', {
      params: {
        MSwyLDM: link,
      },
    });

    // TODO: mock 데이터 제거
    return {
      receiverName: '리시버',
      category: 'THANK',
      content: '히ㅇ너라ㅣㄴ어라ㅣㄴ어라ㅣㄴ머이나러히',
      senderName: '센더',
    };
  },
};

export default shareService;
