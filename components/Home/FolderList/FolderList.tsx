import React from 'react';
import { Folder } from '@/shared/type/folder';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';
import { useRouter } from 'next/router';

interface FolderListProps {
  isEditMode: boolean;
  folderList: Folder[];
  supportsCollectedFolder: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const FolderList = ({
  isEditMode,
  folderList,
  supportsCollectedFolder,
  onEdit,
  onDelete,
}: FolderListProps): React.ReactElement => {
  const router = useRouter();
  const totalCount = folderList.reduce((acc, curr) => acc + curr.postCount, 0);

  const goToPosts = () => {
    router.push('/posts');
  };

  return (
    <>
      {supportsCollectedFolder && <HomeCollectedFolder count={totalCount} items={folderList} onClick={goToPosts} />}
      {folderList.map((folder: Folder) => (
        <HomeFolder
          key={folder.folderId}
          folderId={folder.folderId}
          folderName={folder.folderName}
          count={folder.postCount}
          coverImage={folder.coverImg}
          isEditMode={isEditMode && !folder.default}
          onClick={() => router.push(`/posts?folderId=${folder.folderId}`)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default FolderList;
