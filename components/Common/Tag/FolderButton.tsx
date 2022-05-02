import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import FolderIcon from 'public/svgs/folder.svg';
import theme from '@/styles/theme';
import { ellipsis } from '@/styles/mixins';

export type FolderButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const FolderButton = ({
  children,
  ...rest
}: FolderButtonProps): React.ReactElement => {
  return (
    <FolderButtonContainer {...rest}>
      <i>
        <Image src={FolderIcon} alt="" width={24} height={24} />
      </i>
      <span>{children}</span>
    </FolderButtonContainer>
  );
};

const FolderButtonContainer = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 10.2rem;
  height: 2.8rem;
  padding: 0 1.2rem 0 4rem;
  border-radius: 0.4rem;
  background-color: ${theme.colors.gray2};
  ${theme.fonts.h6};
  color: ${theme.colors.gray6};

  > i {
    position: absolute;
    left: 1.2rem;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.4rem;
  }

  span {
    ${ellipsis()};
    width: 5rem;
  }
`;

export default FolderButton;
