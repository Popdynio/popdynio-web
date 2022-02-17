import React, { FC } from 'react'
import classnames from 'classnames/bind'

const classes = classnames.bind({
  root: 'inline-flex items-center rounded-md justify-center border border-transparent font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  primary: 'text-white bg-blue-600 hover:bg-blue-700',
  secondary: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
  white: 'text-blue-600 border-gray-300 bg-white hover:bg-gray-50',
  small: 'px-2.5 py-1.5  text-xs',
  medium: 'px-3 py-2 text-sm leading-4',
  large: 'px-4 py-2 text-base',
  huge: 'px-6 py-3 text-base'
})

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  color?: 'primary' | 'secondary' | 'white'
  size?: 'small' | 'medium' | 'large' | 'huge'
}

const Button: FC<ButtonProps> = ({ color = 'primary', className, size = 'medium', children, ...props }) => (
  <button type="button" className={classes('root', color, size, className)} {...props}>
    {children}
  </button>
)

export default Button
