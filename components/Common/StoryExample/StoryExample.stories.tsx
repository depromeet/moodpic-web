import React from 'react';
import { Meta, Story } from '@storybook/react';

import StoryExample, { Props } from './StoryExample';

export default {
  component: StoryExample,
  title: 'StoryExample',
} as Meta;

const Template: Story<Props> = (args) => <StoryExample {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithContent = Template.bind({});
WithContent.args = {
  content: 'storybook example content',
};
