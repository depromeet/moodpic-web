import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Toggle, { ToggleProps } from './Toggle';

export default {
  component: Toggle,
  title: 'Toggle',
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});

Default.args = {
  checked: false,
  onChange: action('toggle'),
};
