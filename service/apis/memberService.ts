import fetcher from '@/shared/utils/fetcher';
import { Me } from '@/shared/type/member';

const memberService = {
  getMe: async (): Promise<Me> => {
    const { data } = await fetcher('get', '/users/me');

    return data;
  },
};

export default memberService;
