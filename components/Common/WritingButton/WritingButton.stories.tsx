import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import WritingButton, { WritingButtonProps } from './WritingButton';

export default {
  component: WritingButton,
  title: 'WritingButton',
} as Meta;

const Template: Story<WritingButtonProps> = (args) => (
  <WritingButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onClick: action('go to writing page'),
};
