import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TagButton, { TagButtonProps } from './TagButton';

export default {
  component: TagButton,
  title: 'TagButton',
} as Meta;

const Template: Story<TagButtonProps> = (args) => <TagButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '#Button Example',
  canDelete: false,
  onClick: action('delete the tag'),
};
