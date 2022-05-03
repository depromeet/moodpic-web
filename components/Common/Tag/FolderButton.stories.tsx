import React from 'react';
import { Meta, Story } from '@storybook/react';

import FolderButton, { FolderButtonProps } from './FolderButton';

export default {
  component: FolderButton,
  title: 'FolderButton',
} as Meta;

const Template: Story<FolderButtonProps> = (args) => <FolderButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '가나다라마바사',
};
