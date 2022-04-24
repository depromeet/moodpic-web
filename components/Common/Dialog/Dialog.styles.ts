import styled from 'styled-components';
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
  height: 195px;
  border-radius: 14px;
  background-color: ${theme.colors.gray2};
  &.alert {
    height: 164px;
  }
`;

export const DialogContent = styled.div`
  width: 100%;
  height: 136px;
  padding: 24px 16px 0;
  &.alert {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 105px;
    & > div {
      margin-top: 10px;
      ${theme.fonts.h4}
      color: ${theme.colors.white};
    }
  }
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    ${theme.fonts.h4}
    color: ${theme.colors.white};
    margin-left: 5px;
  }
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

export const ActionBtn = styled.button`
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
  &.alert {
    color: ${theme.colors.white};
    background-color: ${theme.colors.red};
  }
`;
