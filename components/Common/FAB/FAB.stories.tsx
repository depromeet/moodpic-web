import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FAB from './FAB';

export default {
  component: FAB,
  title: 'FAB',
} as Meta;

const Template: Story = (args) => <FAB {...args} />;

export const Default = Template.bind({});

Default.args = {
  onClick: action('go to writing page'),
};
