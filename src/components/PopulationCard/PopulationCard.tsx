import { Transition } from '@headlessui/react'
import * as React from 'react'
import classnames from 'classnames/bind'
import { XIcon } from '@heroicons/react/solid'

export type PopulationCardProps = {
  name: string
  onChangeName: (ev: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

const classes = classnames.bind({
  root: 'w-full',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none'
})

const PopulationCard: React.FC<PopulationCardProps> = props => {
  let { name, onChangeName, onDelete } = props

  const nameComponent = (
    <div className="mt-4">
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
  )

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
      <div className={classes('root', 'rounded-md')}>
        <div className="relative md:px-14 py-3">
          <div className="absolute right-8 top-3">
            <XIcon
              className="text-red-600 w-6 h-6 bg-red-50 rounded-full cursor-pointer p-1 hover:bg-red-100 active:bg-red-200"
              onClick={onDelete}
            />
          </div>
          <div className="flex flex-col gap-2">{nameComponent}</div>
        </div>
      </div>
    </Transition>
  )
}

export default PopulationCard
