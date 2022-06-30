import { useMutation } from 'react-query';
import folderService from '@/service/apis/folderService';
import { removeCookies } from '@/hooks/useCookie';
import { queryClient } from '@/shared/utils/queryClient';
import { QUERY_KEY } from '@/shared/constants/queryKey';

export const useDeleteUserMutation = () =>
  useMutation(() => folderService.withdraw(), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.DELETE_USER);
      removeCookies('authTokn');
    },
  });
