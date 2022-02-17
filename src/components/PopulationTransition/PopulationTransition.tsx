import * as React from 'react'
import classnames from 'classnames/bind'
import { XIcon } from '@heroicons/react/solid'

import Select from '../Select'
import Option from '../Option'
import { Transition } from '@headlessui/react'

export type PopulationTransitionProps = {
  source: string
  dest: string
  alpha: number
  factors: string[]
  includesN: boolean
  groups: string[]
  onChangeAlpha: (ev: React.ChangeEvent<HTMLInputElement>) => void
  onToggleIncludesN: () => void
  onChangeSource: (newSource: string) => void
  onChangeDest: (newDest: string) => void
  onAddFactor: (newFactor: string) => void
  onRemoveFactor: (factor: string) => void
  onDelete: () => void
}

const classes = classnames.bind({
  textInput:
    'w-20 shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md focus:outline-none font-bold text-gray-700',
  checkbox: 'focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded'
})

const PopulationTransition: React.FC<PopulationTransitionProps> = props => {
  let {
    alpha,
    includesN,
    onChangeAlpha,
    onChangeSource,
    onChangeDest,
    onAddFactor,
    onRemoveFactor,
    onToggleIncludesN,
    groups,
    source,
    dest,
    factors = [],
    onDelete
  } = props

  const factorIsActive = (factor: string) => factors.includes(factor)

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
      <div className="py-4 px-6 relative">
        <div className="absolute right-8 top-3">
          <XIcon
            className="text-red-600 w-6 h-6 bg-red-50 rounded-full cursor-pointer p-1 hover:bg-red-100 active:bg-red-200"
            onClick={onDelete}
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="items-center gap-4 text-gray-700 font-medium text-sm">
            <label htmlFor="alpha">alpha</label>
            <input
              name="alpha"
              type="text"
              value={alpha || ''}
              onChange={onChangeAlpha}
              className={classes('textInput')}
            />
          </div>
        </div>
        <div className="mt-3 flex gap-4">
          <div className="w-full">
            <Select label="From" name={source || 'Empty'} value={source || 'Empty'} onChange={onChangeSource}>
              {groups.map(
                (group, i) =>
                  group !== dest && (
                    <Option key={`source-option-${i}-${group}`} value={group}>
                      {group}
                    </Option>
                  )
              )}
            </Select>
          </div>
          <div className="w-full">
            <Select label="Dest" name={dest || 'Empty'} value={dest || 'Empty'} onChange={onChangeDest}>
              {groups.map(
                (group, i) =>
                  group !== source && (
                    <Option key={`dest-option-${i}-${group}`} value={group}>
                      {group}
                    </Option>
                  )
              )}
            </Select>
          </div>
        </div>
        <div className="mt-6 flex items-center text-gray-700 font-medium text-sm">
          <input
            name="beta"
            type="checkbox"
            className={classes('checkbox')}
            checked={includesN || false}
            onChange={onToggleIncludesN}
          />
          <label htmlFor="beta" className="ml-2">
            N
          </label>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-6">
          {groups.map((group, i) => (
            <div key={`factor-${i}-${group}`}>
              <span
                className={classnames(
                  'py-2 px-4 rounded-full bg-gray-50 text-gray-700 font-bold cursor-pointer',
                  factorIsActive(group) && 'bg-gray-500'
                )}
                onClick={() => {
                  if (factorIsActive(group)) {
                    onRemoveFactor(group)
                  } else {
                    onAddFactor(group)
                  }
                }}>
                {group}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Transition>
  )
}

export default PopulationTransition
