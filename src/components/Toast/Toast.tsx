import * as React from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon, XCircleIcon } from '@heroicons/react/solid'
import classnames from 'classnames/bind'

export type ToastProps = {
  show?: boolean
  onClose?: () => void
  variant: 'error' | 'success'
  title: string
  message: string
}

const classes = classnames.bind({
  errorTitle: 'text-red-900',
  successTitle: 'text-green-900',
  errorMessage: 'text-red-600',
  successMessage: 'text-green-600'
})

const Toast: React.FC<ToastProps> = ({ title, variant, message, show = false, onClose }) => {
  const icon = {
    error: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
    success: <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
  }

  React.useEffect(() => {
    // Close automatically after 3 seconds
    setTimeout(() => {
      onClose()
    }, 5000)
  }, [])

  return (
    <div
      aria-live="assertive"
      className="fixed top-0 right-0 left-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={React.Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{icon[variant]}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className={classes('text-sm font-medium', `${variant}Title`)}>{title}</p>
                  <p className={classes('mt-1 text-sm', `${variant}Message`)}>{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-none"
                    onClick={onClose}>
                    <span className="sr-only">Close</span>
                    <XIcon
                      className={classes('h-5 w-5', variant === 'error' ? 'text-red-400' : 'text-green-400')}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Toast
