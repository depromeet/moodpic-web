import React from 'react';
import { Meta, Story } from '@storybook/react';

import CardComponent, { CardProps } from './Card';

export default {
  component: CardComponent,
  title: 'Card',
} as Meta;

const Template: Story<CardProps> = (args) => <CardComponent {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '1차감정에서 2차감정으로 변하셨군요!',
};
