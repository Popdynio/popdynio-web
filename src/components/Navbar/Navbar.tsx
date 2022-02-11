/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type NavbarProps = {}
export type NavbarItem = {
  name: string
  href: string
  active?: boolean
}

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter()

  const items: NavbarItem[] = [
    {
      name: 'Examples',
      href: '/examples',
      active: router.pathname === '/examples'
    }
  ]

  const newForecastLink = (
    <Link href="/forecast">
      <a className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <span>New forecast</span>
      </a>
    </Link>
  )

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a className="block lg:hidden h-8 w-auto text-4xl font-light text-indigo-600">P</a>
                  </Link>
                  <Link href="/">
                    <a className="hidden lg:block h-8 w-auto text-2xl font-light text-indigo-600">Popdynio</a>
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {items.map((item, i) => (
                    <Link key={`navbar-item-${i}`} href={item.href}>
                      <a
                        className={classnames(
                          item.active && 'border-indigo-500',
                          'text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}>
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">{newForecastLink}</div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {items.map((item, i) => (
                <Link key={`navbar-disclosure-link-${i}`} href={item.href}>
                  <a
                    className={classnames(
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6',
                      item.active
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    )}>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
