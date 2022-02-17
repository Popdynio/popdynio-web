import * as React from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export type QuickViewProps = {
  open?: boolean
  onClose: () => void
  title: JSX.Element
  text: JSX.Element
}

const QuickView: React.FC<QuickViewProps> = ({ open = false, onClose, title, text }) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex md:items-center rounded-xl bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                  <XIcon className="h-6 w-6" aria-hidden="true" onClick={onClose} />
                </button>
                <div className="w-full">
                  <h1 className="font-bold text-4xl text-gray-700 text-center">{title}</h1>
                  <p className="mt-20 text-center px-10">{text}</p>
                  <div className="flex justify-end">
                    <button
                      className="mt-20 px-10 text-white bg-green-400 hover:bg-green-600 py-4 rounded-md transition duration-200"
                      color="primary"
                      onClick={onClose}>
                      <span className="font-semibold">I understand</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default QuickView
