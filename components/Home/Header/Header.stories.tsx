import React from 'react';
import { Meta, Story } from '@storybook/react';

import Header from './Header';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const MainHeader = Template.bind({});

MainHeader.args = {};
