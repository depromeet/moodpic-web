import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ButtonWithIcon from './ButtonWithIcon';

export default {
  component: ButtonWithIcon,
  title: 'ButtonWithIcon',
} as Meta;

const Template: Story = (args) => <ButtonWithIcon {...args} />;

export const Default = Template.bind({});

Default.args = {
  onClick: action('click the button'),
  children: 'Button Example',
};
