import * as React from 'react'
import classnames from 'classnames/bind'
import { Transition } from '@headlessui/react'

const classes = classnames.bind({
  small: 'w-6 h-6 border-4',
  medium: 'w-10 h-10 border-4',
  large: 'w-12 h-12 border-4'
})

const Spinner: React.FC<{
  variant?: 'small' | 'large'
  color?: 'blue' | 'white'
}> = ({ variant = 'large', color = 'blue' }) => (
  <Transition
    show
    appear
    as={React.Fragment}
    enter="transition duration-[400ms]"
    enterFrom="opacity-0 rotate-[-120deg] scale-50"
    enterTo="opacity-100 rotate-0 scale-100">
    <div>
      <div
        style={{ borderTopColor: 'transparent' }}
        className={classes(
          'border-blue-400 border-solid rounded-full animate-spin ',
          variant,
          color === 'blue' ? 'border-blue-400' : 'border-white'
        )}
      />
    </div>
  </Transition>
)

export default Spinner
