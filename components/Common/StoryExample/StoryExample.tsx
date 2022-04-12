import React from 'react';

export interface Props {
  content: string;
}

const StoryExample = ({ content }: Props) => {
  return (
    <>
      <h1>StoryExample</h1>
      {content}
    </>
  );
};

export default StoryExample;
