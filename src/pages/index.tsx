import * as React from 'react'
import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'
import { ArchiveIcon, StarIcon, WifiIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { PresentationChartBarIcon } from '@heroicons/react/outline'

import bg1 from '../../public/bg1.png'
import bg2 from '../../public/bg2.jpeg'
import bg3 from '../../public/bg3.jpeg'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement)
import Navbar from '../components/Navbar'
import Link from 'next/link'
import Footer from '../components/Footer'

const Home: FC = () => {
  const integrationLinks = [
    {
      name: 'Python package',
      href: 'https://pypi.org/project/popdyn/',
      description: 'For Python developers, you can download from PyPI the latest version of popdyn.',
      icon: ArchiveIcon
    },
    {
      name: 'API',
      href: 'https://popdynio-api.herokuapp.com/',
      description:
        "If you're a developer, but not a Python developer, still can use our service via our API in your favourite language, which is free for everyone and has the same funcionalities that the package.",
      icon: WifiIcon
    },
    {
      name: 'Web client',
      href: '.',
      description:
        'Last but not least, you can use this web client which communicates with the API with no programming needs.',
      icon: PresentationChartBarIcon
    }
  ]

  const getStarted = (
    <div className="max-w-full mx-auto relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 left-0 z-50">
          <Navbar />
        </div>
        <div className="pt-20 relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Make your own</span>{' '}
                <span className="block text-indigo-600 xl:inline">simulations</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                With <strong>Popdynio</strong> you can make simulations about population dynamics in an easy way
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/forecast">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/examples">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Examples
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="pt-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 z-0">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
            <Image src={bg3} alt="" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  )

  const useOurApi = (
    <div className="bg-white pb-8 sm:pb-12 lg:pb-12">
      <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-32">
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
          <div>
            <div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Just enter a couple of parameters and voila!!!
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We have 3 different methods to try for your simulation based on the same input you provide.
                </p>
              </div>
              <div className="mt-6">
                <div className="inline-flex items-center divide-x divide-gray-300">
                  <div className="flex-shrink-0 flex pr-5">
                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                    <span className="font-medium text-gray-900">Rated 5 stars</span> by over{' '}
                    <span className="font-medium text-indigo-600">4 beta users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392">
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse">
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
              </svg>
            </div>
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
              <Image
                className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src={bg1}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const integrations = (
    <div className="bg-white">
      {/* Header */}
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <Image className="w-full h-full object-cover" layout="fill" objectFit="cover" src={bg2} alt="" />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Integrations</h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            You can try our core product on different ways based on your own needs
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section
        className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading">
        <h2 className="sr-only" id="contact-heading">
          Go for it
        </h2>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {integrationLinks.map(link => (
            <div key={link.name} className="flex flex-col bg-white rounded-2xl shadow-xl">
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                <div className="absolute top-0 p-5 inline-block bg-indigo-600 rounded-xl shadow-lg transform -translate-y-1/2">
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                <p className="mt-4 text-base text-gray-500">{link.description}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                <a
                  href={link.href}
                  target="_blank"
                  className="text-base font-medium text-indigo-700 hover:text-indigo-600">
                  Go for it<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const footer = (
    <footer>
      <Footer />
    </footer>
  )

  return (
    <>
      {getStarted}
      {useOurApi}
      {integrations}
      {footer}
    </>
  )
}

export default Home
