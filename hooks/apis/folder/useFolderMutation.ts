import folderService from '@/service/apis/folderService';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { queryClient } from '@/shared/utils/queryClient';
import { useMutation } from 'react-query';

export const useCreateFolderMutation = () =>
  useMutation((folderName: string) => folderService.createFolder(folderName), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
    },
  });

export const useUpdateFolderMutation = () =>
  useMutation(
    ({ id, folderName }: { id: number; folderName: string }) =>
      folderService.updateFolder(id, folderName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
      },
    },
  );

export const useDeleteFolderMutation = () =>
  useMutation((id: number) => folderService.deleteFolder(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
    },
  });
