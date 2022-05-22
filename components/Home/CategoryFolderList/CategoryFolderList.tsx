import React from 'react';
import { useRouter } from 'next/router';
import HomeFolder from '@/components/Home/Folder/Folder';
import { CategoryFolder } from '@/shared/type/post';

interface CategoryFolderListProps {
  list: CategoryFolder[];
}

const CategoryFolderList = ({ list }: CategoryFolderListProps): React.ReactElement => {
  const router = useRouter();

  return (
    <>
      {list.map((folder: CategoryFolder) => (
        <HomeFolder
          key={folder.categoryId}
          folderName={folder.description}
          count={folder.count}
          coverImage={folder.image}
          isEditMode={false}
          onClick={() => router.push(`/posts?categoryId=${folder.categoryId}`)}
        />
      ))}
    </>
  );
};

export default CategoryFolderList;
