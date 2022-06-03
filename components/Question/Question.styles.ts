import styled from 'styled-components';
import theme from '@/styles/theme';

export const ButtonContainer = styled.div`
  margin: 24px 0;
  & > div > button:not(:last-child) {
    margin-right: 12px;
  }
`;

export const TooltipWrapper = styled.div`
  position: absolute;
  left: 18px;
  top: 150px;
  display: inline-flex;
  flex-direction: column;
  max-width: 339px;
  width: 100%;
  padding: 18px;
  background-color: ${theme.colors.white};
  border-radius: 14px;
  z-index: 100;
`;

export const Triangle = styled.div`
  position: absolute;
  top: -11px;
  left: 18px;
  width: 0;
  height: 0;
  border-bottom: 15px solid ${theme.colors.white};
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
`;

export const ImageWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const TooltipTitle = styled.div`
  ${theme.fonts.h5}
  margin-bottom: 12px;
`;

export const TooltipDescriptionWrap = styled.ol`
  display: flex;
  flex-direction: column;
`;

export const TooltipDescription = styled.li`
  ${theme.fonts.body}
  ${theme.colors.black}
  font-weight: 500;
  margin-left: 1.6rem;
`;

export const NumberTitle = styled.div`
  ${theme.fonts.h5};
  color: ${theme.colors.gray4};
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  & > .highlight {
    color: ${theme.colors.primary};
  }
`;

export const ProvidedQuestionWrap = styled.div`
  margin-bottom: 40px;
  &.last-child {
    margin-bottom: 0;
  }
`;

export const ProvidedQuestionMainTitle = styled.div`
  ${theme.fonts.h3};
  color: ${theme.colors.white};
  margin-bottom: 2rem;
`;

export const ProvidedQuestionSubDescription = styled.div`
  ${theme.fonts.h6};
  font-weight: 500;
  color: ${theme.colors.gray4};
  margin-top: -1rem;
  margin-bottom: 2rem;
`;

export const MyselfQuestionTitle = styled.div`
  ${theme.fonts.btn1};
  color: ${theme.colors.gray6};
  margin: 6px 0 20px;
`;
