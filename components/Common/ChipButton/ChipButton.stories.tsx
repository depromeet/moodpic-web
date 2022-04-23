import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChipButton, { ChipButtonProps } from './ChipButton';

export default {
  component: ChipButton,
  title: 'ChipButton',
} as Meta;

const Template: Story<ChipButtonProps> = (args) => <ChipButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '#Button Example',
  canDelete: false,
  onDelete: action('delete the tag'),
};
