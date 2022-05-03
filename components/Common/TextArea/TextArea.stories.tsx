import React from 'react';
import { Meta, Story } from '@storybook/react';

import TextArea, { TextAreaProps } from './TextArea';

export default {
  component: TextArea,
  title: 'TextArea',
} as Meta;

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {};
