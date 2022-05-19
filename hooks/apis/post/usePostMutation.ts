import { useMutation } from 'react-query';
import postService from '@/service/apis/postService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';

export const useDeletePostMutation = () =>
  useMutation((id: string) => postService.deletePostById([id]), {
    onSuccess: () => {
      queryClient.resetQueries(QUERY_KEY.GET_POSTS_BY_FOLDER_ID);
    },
  });
