import theme from '@/styles/theme';
import styled from 'styled-components';
import { ProvidedQuestionMainTitle } from '../Question/Question.styles';

export const PostDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;
  margin-top: 2rem;
`;

export const TagContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 1.8rem;
  margin: 0 -1.8rem 2.4rem;

  div {
    flex: 0 0 auto;
  }

  div ~ div {
    margin-left: 1.2rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Description = styled.p`
  ${theme.fonts.caption1};
  color: ${theme.colors.gray4};
  margin-left: auto;

  div ~ & {
    margin-top: 1.4rem;
  }

  & ~ & {
    margin-top: 1rem;
  }
`;

export const CardContainer = styled.div`
  margin-bottom: 2.4rem;
`;

export const MultipleLineText = styled(ProvidedQuestionMainTitle)`
  line-height: 160%;
`;

export const QuestionContainer = styled.div`
  margin-bottom: -2.6rem;
`;
