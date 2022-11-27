import React from 'react';
import Link from 'next/link';
import { Folder } from '@/shared/type/folder';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';

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
  const totalCount = folderList.reduce((acc, curr) => acc + curr.postCount, 0);

  const getCollectedFolder = () => {
    if (!supportsCollectedFolder) return <></>;

    return isEditMode ? (
      <HomeCollectedFolder count={totalCount} items={thumbnailList || []} />
    ) : (
      <Link href="/posts">
        <a>
          <HomeCollectedFolder count={totalCount} items={thumbnailList || []} />
        </a>
      </Link>
    );
  };

  return (
    <>
      {getCollectedFolder()}
      {folderList.map((folder) => {
        {
          return isEditMode ? (
            <HomeFolder
              supportsEmptyImg={supportsCollectedFolder}
              key={folder.folderId}
              folderId={folder.folderId}
              folderName={folder.folderName}
              count={folder.postCount}
              coverImage={folder.coverImg}
              isEditMode={isEditMode}
              isDefaultFolder={folder.default}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ) : (
            <Link key={folder.folderId} href={`/posts?folderId=${folder.folderId}`} passHref>
              <a>
                <HomeFolder
                  supportsEmptyImg={supportsCollectedFolder}
                  folderId={folder.folderId}
                  folderName={folder.folderName}
                  count={folder.postCount}
                  coverImage={folder.coverImg}
                  isEditMode={isEditMode}
                  isDefaultFolder={folder.default}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </a>
            </Link>
          );
        }
      })}
    </>
  );
};

export default FolderList;
