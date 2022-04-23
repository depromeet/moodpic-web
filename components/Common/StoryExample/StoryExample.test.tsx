import React from 'react';

import { render } from '@testing-library/react';
import StoryExample, { Props } from './StoryExample';

describe('<StoryExample />', () => {
  it('content를 렌더링 해야한다.', () => {
    const { Content } = renderStoryExample({
      content: 'example',
    });

    expect(Content).toBeInTheDocument();
  });

  it('실패하는 테스트', () => {
    const { Content } = renderStoryExample({
      content: 'example',
    });

    expect(Content).not.toBeInTheDocument();
  });
});

const renderStoryExample = ({ content = 'default' }: Partial<Props>) => {
  const result = render(<StoryExample content={content} />);

  const Content = result.getByText(content);

  return { result, Content };
};
