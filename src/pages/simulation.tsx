import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../layouts'
import { PlusSmIcon, RefreshIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { Line } from 'react-chartjs-2'

export type Card = {
  name: string
  onChangeName: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const Card: React.FC<Card> = ({ name, onChangeName }) => {
  return (
    <Transition
      show
      appear
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <div className="w-full shadow-sm">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChangeName}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
          />
        </div>
      </div>
    </Transition>
  )
}

const Simulation: NextPage = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const data = {
    labels,
    datasets: [
      {
        label: 'Susceptibles',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Infectados',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        label: 'Recuperados',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(150, 62, 25)',
        backgroundColor: 'rgba(100, 88, 0, 0.5)'
      }
    ]
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  }

  const [cards, setCards] = React.useState<Partial<Card>[]>([
    {
      name: 'P-1'
    }
  ])

  const handleAddEmptyCard = () => {
    setCards([...cards, { name: `P-${cards.length + 1}` }])
  }

  const handleRefreshCards = () => {
    setCards([{ name: 'P-1' }])
  }

  const handleChangeCardName = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    const list = [...cards]
    list[index].name = value
    console.log(list)
    setCards(list)
  }

  const inputSide = (
    <div className="w-full md:w-1/2">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full px-20 flex flex-col gap-10">
          {cards.map((card, i) => (
            <Card key={`card-${i}`} name={card.name} onChangeName={handleChangeCardName(i)} />
          ))}
        </div>
        <div className="mt-10">
          <button
            className="rounded-3xl bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3 cursor-pointer transition duration-300 inline-flex items-center text-white"
            onClick={handleAddEmptyCard}>
            <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Add new</span>
          </button>
        </div>
      </div>
    </div>
  )

  const resultsSide = (
    <div className="w-full md:w-1/2">
      <div className="">
        <div className="w-full">
          <Line data={data} />
        </div>
      </div>
    </div>
  )

  return (
    <Layout>
      <h1 className="font-semibold text-4xl flex items-center gap-10">
        Please specify your input
        <RefreshIcon
          className="w-10 h-10 text-green-600 font-bold bg-green-50 rounded-full cursor-pointer"
          onClick={handleRefreshCards}
        />
      </h1>
      <div className="md:flex h-48 md:gap-5 mt-20">
        {inputSide}
        {resultsSide}
      </div>
    </Layout>
  )
}

export default Simulation
