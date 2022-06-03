import React from 'react';
import { Meta, Story } from '@storybook/react';

import CategorySelectorComponent, { CategorySelectorProps } from './CategorySelector';

export default {
  component: CategorySelectorComponent,
  title: 'CategorySelector',
} as Meta;

const Template: Story<CategorySelectorProps> = (args) => <CategorySelectorComponent {...args} />;

export const Default = Template.bind({});

Default.args = {
  selectedValue: 'JOY',
  title: '기록 이전 감정',
  options: [
    {
      id: 'JOY',
      label: '기뻐요',
    },
  ],
  disabled: false,
  onChange: () => console.log('check'),
};
