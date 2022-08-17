import { useMutation } from 'react-query';
import folderService from '@/service/apis/folderService';
import { removeCookies } from '@/hooks/useCookie';
import { queryClient } from '@/shared/utils/queryClient';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import memberService from '@/service/apis/memberService';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/shared/type/common';
import { AxiosError } from 'axios';

export const useDeleteUserMutation = () =>
  useMutation(() => folderService.withdraw(), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.DELETE_USER);
      removeCookies('authToken');
    },
  });

export const useUpdateNickname = () => {
  const notify = useToast();
  return useMutation((name: string) => memberService.updateNickname(name), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_ME);
      notify({
        type: ToastType.CONFIRM,
        message: '닉네임이 변경되었습니다.',
      });
    },
    onError: (error) => {
      notify({
        type: ToastType.ERROR,
        message: (error as AxiosError).response?.data.msg,
      });
    },
  });
};
