import React from 'react';
import HomeFolder from '@/components/Home/Folder/Folder';
import { CategoryFolder } from '@/shared/type/post';
import Link from 'next/link';

interface CategoryFolderListProps {
  list: CategoryFolder[];
}

const CategoryFolderList = ({ list }: CategoryFolderListProps): React.ReactElement => {
  return (
    <>
      {list.map((folder: CategoryFolder) => (
        <Link key={folder.categoryId} href={`/posts?categoryId=${folder.categoryId}`}>
          <HomeFolder
            folderId={folder.categoryId}
            folderName={folder.description}
            count={folder.count}
            coverImage={folder.image}
            isEditMode={false}
          />
        </Link>
      ))}
    </>
  );
};

export default CategoryFolderList;
