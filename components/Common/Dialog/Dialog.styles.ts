import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

export const DialogWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

export const DialogDimmed = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const DialogWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DialogInner = styled.div`
  width: 313px;
  border-radius: 14px;
  background-color: ${theme.colors.gray2};
`;

export const DialogContent = styled.div`
  width: 100%;
`;

export const DialogBottom = styled.div`
  border-top: 1px solid ${theme.colors.gray3};
`;

export const CancelBtn = styled.button`
  display: inline-block;
  border-right: 1px solid ${theme.colors.gray3};
  ${theme.fonts.h4}
  padding: 20px 0;
  width: 50%;
  text-align: center;
  color: ${theme.colors.white};
  cursor: pointer;
`;

export const ActionBtn = styled.button<{ dialogType: 'alert' | 'modal' }>`
  display: inline-block;
  ${theme.fonts.h4}
  padding: 19px 0;
  width: 50%;
  text-align: center;
  color: ${theme.colors.black};
  border-bottom-right-radius: 14px;
  background-color: #ffed47;
  cursor: pointer;
  :disabled {
    background-color: ${theme.colors.gray2};
    color: ${theme.colors.gray3};
  }

  ${(props) =>
    props.dialogType === 'alert' &&
    css`
      color: ${theme.colors.white};
      background-color: ${theme.colors.red};
    `};
`;
