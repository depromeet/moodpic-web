import React from 'react';
import { Folder } from '@/shared/type/folder';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';
import { useRouter } from 'next/router';

interface FolderListProps {
  isEditMode: boolean;
  folderList: Folder[];
  thumbnailList?: string[];
  supportsCollectedFolder: boolean;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const FolderList = ({
  isEditMode,
  folderList,
  thumbnailList,
  supportsCollectedFolder,
  onEdit,
  onDelete,
}: FolderListProps): React.ReactElement => {
  const router = useRouter();
  const totalCount = folderList.reduce((acc, curr) => acc + curr.postCount, 0);

  const goToPosts = () => {
    router.push('/posts');
  };

  const onClick = (folderId: number) => {
    router.push(`/posts?folderId=${folderId}`);
  };

  return (
    <>
      {supportsCollectedFolder && (
        <HomeCollectedFolder
          count={totalCount}
          items={thumbnailList || []}
          isEditMode={isEditMode}
          onClick={goToPosts}
        />
      )}
      {folderList.map((folder) => (
        <HomeFolder
          supportsEmptyImg={supportsCollectedFolder}
          key={folder.folderId}
          folder={folder}
          isEditMode={isEditMode}
          onClick={onClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default FolderList;
