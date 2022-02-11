import { Transition } from '@headlessui/react'
import * as React from 'react'
import classnames from 'classnames/bind'

export type PopulationCardProps = {
  name: string
  onChangeName: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const classes = classnames.bind({
  root: 'w-full shadow-sm',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none'
})

const PopulationCard: React.FC<PopulationCardProps> = props => {
  let { name, onChangeName } = props

  return (
    <Transition
      show
      appear
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-x-4 scale-95"
      enterTo="opacity-100 translate-x-0 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-x-4 scale-100"
      leaveTo="opacity-0 translate-x-0 scale-95">
      <div className={classes('root', 'rounded-md shadow-lg p-10')}>
        <label htmlFor={`name-${name}`} className={classes('label')}>
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            autoComplete="false"
            name={`name-${name}`}
            value={name}
            onChange={onChangeName}
            className={classes('input', 'font-bold text-gray-700')}
          />
        </div>
      </div>
    </Transition>
  )
}

export default PopulationCard
