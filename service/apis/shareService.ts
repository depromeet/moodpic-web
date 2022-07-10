import fetcher from '@/shared/utils/fetcher';
import { GetSharedPostResponse, SharePostRequest } from '@/shared/type/share';

const shareService = {
  sharePost: async ({ receiverName, category, postId }: SharePostRequest): Promise<string> => {
    const body: SharePostRequest = { receiverName, category, postId };
    const {
      data: { link },
    } = await fetcher('post', '/api/v1/sharing', body);

    return link;
  },

  getSharedPost: async (link: string): Promise<GetSharedPostResponse> => {
    const { data } = await fetcher('get', `/api/v1/sharing/${link}`);

    return data;
  },
};

export default shareService;
