import { useMutation } from 'react-query';
import folderService from '@/service/apis/folderService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';
import { FolderSuccessResponse } from '@/shared/type/folder';
import { AxiosError } from 'axios';

export const useCreateFolderMutation = () =>
  useMutation<FolderSuccessResponse, AxiosError, string>(
    (folderName: string) => folderService.createFolder(folderName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
      },
      onError: (error) => {
        // TODO: 콘솔 에러 안 띄우도록 수정해야 됨
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log(({ error }.error as any).response.data.msg);
      },
    },
  );

export const useUpdateFolderMutation = () =>
  useMutation(({ id, folderName }: { id: number; folderName: string }) => folderService.updateFolder(id, folderName), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
    },
  });

export const useDeleteFolderMutation = () =>
  useMutation((id: number) => folderService.deleteFolder(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
    },
  });
