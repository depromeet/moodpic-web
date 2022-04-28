import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonProps } from './Button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  size: 'large',
  onClick: action('click the button'),
  children: 'Button Example',
};

export const Gray = Template.bind({});

Gray.args = {
  ...Primary.args,
  color: 'gray',
};

export const MediumButton = Template.bind({});

MediumButton.args = {
  ...Gray.args,
  size: 'medium',
};

export const SmallButton = Template.bind({});

SmallButton.args = {
  ...Gray.args,
  size: 'small',
};
