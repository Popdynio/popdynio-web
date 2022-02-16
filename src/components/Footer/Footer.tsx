import * as React from 'react'
import { HeartIcon, CodeIcon } from '@heroicons/react/solid'
import Image from 'next/image'

import reactIcon from '../../../public/react-js.svg'

const Footer: React.FC = () => {
  const reactAnimation = <Image src={reactIcon} height={20} width={20} className="" />
  return (
    <div className="h-10 bg-gray-100 flex justify-center items-center">
      Popdynio <div className="mx-3">-</div>
      <div className="flex items-center">
        <CodeIcon className="w-5 h-5 mx-1" /> with
        <span>
          <HeartIcon className="w-5 h-5 text-red-500 mx-1 animate-pulse" />
        </span>
        in <span className="mx-2 pt-1">{reactAnimation}</span>
      </div>
    </div>
  )
}

export default Footer
