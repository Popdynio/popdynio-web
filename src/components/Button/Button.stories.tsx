import React from 'react'
import { Story, Meta } from '@storybook/react'

import Button, { ButtonProps } from './Button'

export default {
  component: Button,
  title: 'Button'
} as Meta

const Template: Story<ButtonProps> = ({ children, ...args }) => <Button {...args}>{children}</Button>

export const Primary = Template.bind({})

Primary.args = {
  color: 'primary',
  children: 'Button',
  size: 'medium'
}
export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  children: 'Button',
  size: 'medium'
}

export const White = Template.bind({})
White.args = {
  color: 'white',
  children: 'Button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  color: 'primary',
  children: 'Button',
  size: 'small'
}

export const Medium = Template.bind({})
Medium.args = {
  color: 'primary',
  children: 'Button',
  size: 'medium'
}

export const Large = Template.bind({})
Large.args = {
  color: 'primary',
  children: 'Button',
  size: 'large'
}

export const Huge = Template.bind({})
Huge.args = {
  color: 'primary',
  children: 'Button',
  size: 'huge'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  color: 'primary',
  children: 'Button',
  size: 'huge',
  className: 'w-full'
}
