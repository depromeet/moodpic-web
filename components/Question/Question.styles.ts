import styled from 'styled-components';
import theme from '@/styles/theme';

export const TooltipWrapper = styled.div`
  position: absolute;
  left: 1.8rem;
  top: 15rem;
  display: inline-flex;
  flex-direction: column;
  max-width: 33.9rem;
  width: 100%;
  padding: 1.8rem;
  background-color: ${theme.colors.white};
  border-radius: 1.4rem;
  z-index: 100;
`;

export const Triangle = styled.div`
  position: absolute;
  top: -1.1rem;
  left: 1.8rem;
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid ${theme.colors.white};
  border-left: 1.3rem solid transparent;
  border-right: 1.3rem solid transparent;
`;

export const ImageWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const TooltipTitle = styled.div`
  ${theme.fonts.h5}
  margin-bottom: 1.2rem;
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
  margin-bottom: 0.6rem;
  & > .highlight {
    color: ${theme.colors.primary};
  }
`;

export const QuestionWrap = styled.div`
  margin-bottom: 4rem;
`;

export const ProvidedQuestionMainTitle = styled.div`
  ${theme.fonts.h3};
  line-height: 160%;
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
  margin: 3.2rem 0 2rem;
`;
