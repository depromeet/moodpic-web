import theme from '@/styles/theme';
import React, { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ProgressProps {
  step: number;
  onClick?: MouseEventHandler;
}

const Progress = ({ step, ...props }: ProgressProps): React.ReactElement => {
  return (
    <ProgressWrap {...props}>
      <ProgressBar step={step} />
    </ProgressWrap>
  );
};

export default memo(Progress);

const ProgressWrap = styled.div`
  width: 100%;
  height: 4px;
  margin-top: 10px;
  border-radius: 50px;
  background-color: ${theme.colors.gray2};
`;

const ProgressBar = styled.div<{ step: number }>`
  width: calc(25% * ${({ step }) => step});
  height: 4px;
  border-radius: 50px;
  background-color: ${theme.colors.primary};
  transition: width 1s cubic-bezier(0.08, 0.82, 0.17, 1);
`;
