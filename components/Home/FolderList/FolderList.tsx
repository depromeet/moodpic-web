import React from 'react';
import styled from 'styled-components';
import { Folder } from '@/shared/type/folder';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';

interface FolderListProps {
  isEditMode: boolean;
  folderList: Folder[];
  supportsCollectedFolder: boolean;
}

const FolderList = ({
  isEditMode,
  folderList,
  supportsCollectedFolder
}: FolderListProps): React.ReactElement => {
  const totalCount = folderList.reduce((acc, curr) => acc + curr.postCount, 0);

  return (
    <FolderListContainer>
      {supportsCollectedFolder && <HomeCollectedFolder count={totalCount} items={folderList} />}
      {folderList.map((folder: Folder) => (
        <HomeFolder
          key={folder.folderId}
          folder={folder}
          isEditMode={isEditMode}
        />
      ))}
    </FolderListContainer>
  );
};

const FolderListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.8rem;
  row-gap: 1.4rem;
  padding-top: 2rem;
`;

export default FolderList;
