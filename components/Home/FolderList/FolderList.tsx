import React from 'react';
import styled from 'styled-components';
import HomeFolder from '@/components/Home/Folder/Folder';
import HomeCollectedFolder from '@/components/Home/CollectedFolder/CollectedFolder';

const FolderList = (): React.ReactElement => {
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
        <HomeFolder key={folder.name} name="폴더명" count={3} thumbnail="" />
      ))}
    </FolderListContainer>
  );
};

const FolderListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
  row-gap: 14px;
  padding-top: 20px;
`;

export default FolderList;
