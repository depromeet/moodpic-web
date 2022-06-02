import React from 'react';
import { Meta, Story } from '@storybook/react';

import Loading from './Loading';

export default {
  component: Loading,
  title: 'Loading',
} as Meta;

const Template: Story = (args) => <Loading {...args} />;

export const DefaultLoading = Template.bind({});

DefaultLoading.args = {};
