import { useMutation } from 'react-query';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';
import { PostRequestType } from '@/shared/type/post';
import postService from '@/service/apis/postService';
import useNextProgressStep from '@/hooks/useNextProgressStep';

export const useCreatePostMutation = () => {
  const nextProgressStep = useNextProgressStep();
  return useMutation((postData: PostRequestType) => postService.createPost(postData), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.CREATE_POST);
      nextProgressStep();
    },
    onError: (error) => {
      // TODO: toast로 에러메시지 띄워주기, 문제 : 현재는 toast가 hook이라서 분기문 안에서 호출 불가, toast를 간소화 해야됨
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(({ error }.error as any).response.data.msg);
    },
  });
};

export const useDeletePostMutation = () =>
  useMutation((ids: string[]) => postService.deletePostById(ids), {
    onSuccess: () => {
      queryClient.resetQueries(QUERY_KEY.GET_POSTS_BY_FOLDER_ID);
      queryClient.resetQueries(QUERY_KEY.GET_FOLDERS);
    },
  });
