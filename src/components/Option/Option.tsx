import * as React from 'react'
import classnames from 'classnames'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

export type OptionProps = {
  value: string
}

const Option: React.FC<OptionProps> = ({ value, children }) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        classnames(
          active ? 'text-white bg-indigo-600' : 'text-gray-900',
          'cursor-default select-none relative py-2 pl-3 pr-9'
        )
      }
      value={value}>
      {({ selected, active }) => (
        <>
          <span className={classnames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{children}</span>
          {selected ? (
            <span
              className={classnames(
                active ? 'text-white' : 'text-indigo-600',
                'absolute inset-y-0 right-0 flex items-center pr-4'
              )}>
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  )
}

export default Option
