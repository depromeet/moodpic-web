import React from 'react';
import { useRouter } from 'next/router';
import { CommonAppBar, CommonIconButton } from '@/components/Common';
import { TextButton } from './PostEdit.style';

interface AppBarProps {
  onSubmit: () => void;
}

const PostEditAppBar = ({ onSubmit }: AppBarProps) => {
  const router = useRouter();

  const onClickToBack = () => {
    router.back();
  };

  return (
    <CommonAppBar>
      <CommonAppBar.Left>
        <CommonIconButton iconName="close" onClick={onClickToBack} />
      </CommonAppBar.Left>
      <CommonAppBar.Right>
        <TextButton onClick={onSubmit}>완료</TextButton>
      </CommonAppBar.Right>
    </CommonAppBar>
  );
};

export default PostEditAppBar;
