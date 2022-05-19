import { useMutation } from 'react-query';
import postService from '@/service/apis/postService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';

export const useDeletePostMutation = () =>
  useMutation((id: string) => postService.deletePostById([id]), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_POSTS, QUERY_KEY.GET_POST_BY_ID]);
    },
  });
