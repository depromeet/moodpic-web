import React from 'react';
import { Meta, Story } from '@storybook/react';

import ChipButton, { ChipButtonProps } from './ChipButton';

export default {
  component: ChipButton,
  title: 'ChipButton',
} as Meta;

const Template: Story<ChipButtonProps> = (args) => <ChipButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '모르겠어요',
};
