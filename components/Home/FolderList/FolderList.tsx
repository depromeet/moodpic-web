import React from 'react';
import styled from 'styled-components';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';

interface FolderListProps {
  isEditMode: boolean;
}

const FolderList = ({ isEditMode }: FolderListProps): React.ReactElement => {
  const folderList = [
    {
      name: '폴더명1',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명2',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명3',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명4',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명5',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명6',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명7',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명8',
      count: 3,
      thumbnail: '',
    },
    {
      name: '폴더명9',
      count: 3,
      thumbnail: '',
    },
  ];

  return (
    <FolderListContainer>
      <HomeCollectedFolder count={3} items={folderList} />
      {folderList.map((folder) => (
        <HomeFolder
          key={folder.name}
          name="폴더명"
          count={3}
          thumbnail=""
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
