import React from 'react';
import { Meta, Story } from '@storybook/react';

import Header, { HeaderProps } from './Header';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const MainHeader = Template.bind({});

MainHeader.args = {
  isScrollOnTop: false,
};
