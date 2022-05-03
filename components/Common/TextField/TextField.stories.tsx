import React from 'react';
import { Meta, Story } from '@storybook/react';
import WhiteAdd from 'public/svgs/whiteadd.svg';

import TextField, { TextFieldProps } from './TextField';

export default {
  component: TextField,
  title: 'TextField',
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '태그를 추가해주세요.',
  rightSideIcon: WhiteAdd,
};
