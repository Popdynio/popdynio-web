import * as React from 'react'
import { NextPage } from 'next'
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

import * as api from '../api'
import Layout from '../layouts/Layout'
import Select from '../components/Select'
import Option from '../components/Option'
import { SolverMethod } from '../api'
import { colors } from '../styles/color.palette'
import { ChevronRightIcon } from '@heroicons/react/outline'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import DiffEquationButton from '../components/DiffEquationButton'

const ExamplesPage: NextPage = () => {
  const [example, setExample] = React.useState('sir')
  const [steps, setSteps] = React.useState(5)
  const [solver, setSolver] = React.useState<SolverMethod>('ODE')
  const [time, setTime] = React.useState(50)
  const [initialPopulation, setInitialPopulation] = React.useState([100, 100, 100])
  const [transitions, setTransitions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [diffEquation, setDiffEquation] = React.useState(null)
  const [plotData, setPlotData] = React.useState<Object>(null)
  const [notification, setNotification] = React.useState<{
    type: 'error' | 'success'
    title: string
    message: string
  }>(null)
  const exampleData = {
    sir: {
      title: 'SIR Model',
      request: {
        ids: ['S', 'I', 'R'],
        forecast_time: time * 10,
        transitions: [
          {
            alpha: 0.35,
            source: 'S',
            dest: 'I',
            factors: ['S', 'I'],
            includes_n: true
          },
          {
            alpha: 0.035,
            source: 'I',
            dest: 'R',
            factors: ['I'],
            includes_n: false
          }
        ],
        initial_population: [300, 10, 0],
        method: solver,
        cut_every: steps
      }
    },
    sis: {
      title: 'SIS Model',
      request: {
        ids: ['S', 'I'],
        forecast_time: time * 10,
        transitions: [
          {
            alpha: 4,
            source: 'S',
            dest: 'I',
            factors: ['S', 'I'],
            includes_n: true
          },
          {
            alpha: 2,
            source: 'I',
            dest: 'S',
            factors: ['I'],
            includes_n: false
          }
        ],
        initial_population: [500, 10],
        method: solver,
        cut_every: steps
      }
    },
    seir: {
      title: 'SEIR model',
      request: {
        ids: ['S', 'E', 'I', 'R'],
        forecast_time: time * 10,
        transitions: [
          {
            alpha: 8.4 / 7,
            source: 'S',
            dest: 'E',
            factors: ['S', 'I'],
            includes_n: true
          },
          {
            alpha: 1 / 5,
            source: 'E',
            dest: 'I',
            factors: ['E'],
            includes_n: false
          },
          {
            alpha: 1 / 7,
            source: 'I',
            dest: 'R',
            factors: ['I'],
            includes_n: false
          }
        ],
        initial_population: [1000, 500, 0, 0],
        method: solver,
        cut_every: steps
      }
    },
    seis: {
      title: 'SEIS model',
      request: {
        ids: ['S', 'E', 'I'],
        forecast_time: time * 10,
        transitions: [
          {
            alpha: 8.4 / 7,
            source: 'S',
            dest: 'E',
            factors: ['S', 'I'],
            includes_n: true
          },
          {
            alpha: 1 / 5,
            source: 'E',
            dest: 'I',
            factors: ['E'],
            includes_n: false
          },
          {
            alpha: 1 / 7,
            source: 'I',
            dest: 'S',
            factors: ['I'],
            includes_n: false
          }
        ],
        initial_population: [1000, 500, 0],
        method: solver,
        cut_every: steps
      }
    }
  }
  const current = exampleData[example]

  const fetchData = () => {
    setLoading(true)
    const fixedTransitions = transitions.map(transition => {
      return {
        ...transition,
        alpha: !isNaN(parseFloat(transition.alpha)) ? parseFloat(transition.alpha) : 0
      }
    })
    const fixedPopulation = initialPopulation.map(pop => pop || 0)
    api
      .forecast({
        ...current.request,
        initial_population: fixedPopulation,
        transitions: fixedTransitions
      })
      .then(response => {
        setLoading(false)
        const newDatasets = []
        current.request.ids.forEach((group, i) => {
          let randomColor = colors[i]
          if (!randomColor) {
            randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
          }
          newDatasets.push({
            label: group,
            data: response.data.forecast[group],
            borderColor: randomColor
          })
        })
        const newData = {
          labels: response?.data?.time,
          datasets: newDatasets
        }
        if (response.data.diff_response) {
          setDiffEquation({
            ids: current.request.ids,
            ...response.data.diff_response
          })
        }
        setPlotData(newData)
      })
      .catch(err => {
        setLoading(false)
        setPlotData(null)
        console.log(err?.response?.data?.detail)
        setNotification({
          type: 'error',
          title: 'Ups!',
          message: 'There was an error with the API'
        })
        console.error(err)
      })
  }

  React.useEffect(() => {
    setTransitions(exampleData[example].request.transitions)
    setInitialPopulation(exampleData[example].request.initial_population)
  }, [])

  const handleRun = () => fetchData()

  const handleChangeExample = (newVal: string | number) => {
    setExample(newVal as string)
    setInitialPopulation(exampleData[newVal].request.initial_population)
    setTransitions(exampleData[newVal].request.transitions)
  }

  const handleChangeInitialPopulation = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const list = [...initialPopulation]
    list[index] = parseInt(ev.target.value)
    setInitialPopulation(list)
  }

  const handleChangeTransitionAlpha = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const list = [...transitions]
    list[index].alpha = ev.target.value
    setTransitions(list)
  }

  const header = (
    <div className="flex justify-between">
      <h1 className="font-semibold text-2xl md:text-4xl text-gray-200">Examples</h1>
      <div className="w-60">
        <Select label="" value={example} name={example} onChange={handleChangeExample}>
          <Option value="sir">sir</Option>
          <Option value="sis">sis</Option>
          <Option value="seir">seir</Option>
          <Option value="seis">seis</Option>
        </Select>
      </div>
    </div>
  )

  const initialPopulationInput = (
    <div className="flex flex-col">
      <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">Initial population</h1>
      <div className="flex flex-col gap-2 h-56 border p-2 rounded-lg overflow-y-scroll mb-10">
        {initialPopulation?.length > 0 &&
          initialPopulation.map((pop, i) => (
            <div key={`initial-population-${i}`}>
              <label htmlFor={`initial-population-${i}`} className="text-gray-700 font-medium text-sm">
                {current.request.ids[i]}
              </label>
              <input
                className="w-2/3 shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md focus:outline-none font-bold text-gray-700"
                name={`initial-population-${i}`}
                value={pop}
                onChange={handleChangeInitialPopulation(i)}
                type="number"
              />
            </div>
          ))}
      </div>
    </div>
  )

  const alphasInput = (
    <div className="flex flex-col">
      <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">Alphas</h1>
      <div className="flex flex-col gap-2 h-56 border p-2 rounded-lg overflow-y-scroll mb-10">
        {transitions?.length > 0 &&
          transitions.map((transition, i) => (
            <div key={`transition-${i}`}>
              <label htmlFor={`transition-${i}`} className="text-gray-700 font-medium text-sm">
                {transition.source} - {transition.dest}
              </label>
              <input
                className="w-2/3 shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md focus:outline-none font-bold text-gray-700"
                name={`transition-${i}`}
                value={transition.alpha}
                onChange={handleChangeTransitionAlpha(i)}
                type="number"
              />
            </div>
          ))}
      </div>
    </div>
  )

  const inputFields = (
    <div className="mt-0 md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialPopulationInput}
        {alphasInput}
      </div>
      <label htmlFor="range" className="font-bold text-gray-600">
        Time: {time * 10}
      </label>
      <input
        type="range"
        name="range"
        className="w-full h-2 bg-blue-100 appearance-none"
        value={time}
        onChange={ev => setTime(parseInt(ev.target.value))}
      />
      <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
        <div className="w-full md:w-40">
          <Select
            label="Solver"
            name={solver || ''}
            value={solver || ''}
            onChange={newVal => setSolver(newVal as SolverMethod)}>
            <Option value="ODE">ODE</Option>
            <Option value="Gillespie">Gillespie</Option>
            <Option value="TauLeaping">TauLeaping</Option>
          </Select>
        </div>
        <div className="w-full md:w-40">
          <Select
            label="Steps"
            name={steps.toString() || ''}
            value={steps || ''}
            onChange={newVal => setSteps(parseInt(newVal.toString()))}>
            <Option value="1">1</Option>
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
          </Select>
        </div>
      </div>
      <button
        className="float-right mt-10 h-20 w-40 bg-green-400 rounded-2xl text-3xl text-white font-extrabold hover:outline-none px-4 hover:bg-green-600 transition duration-300"
        onClick={handleRun}>
        <div className="flex items-center justify-center">
          <ChevronRightIcon className="h-10 w-10" /> Run
        </div>
      </button>
    </div>
  )

  const loadingState = (
    <div className="w-full h-96 flex items-center justify-center">
      <Spinner />
    </div>
  )

  const result = (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-gray-700">{current?.title}</h2>
      {loading
        ? loadingState
        : !!plotData && (
            <>
              <Line data={plotData as any} />
              {diffEquation && (
                <div className="flex justify-center">
                  <DiffEquationButton diffEquation={diffEquation} />
                </div>
              )}
            </>
          )}
    </div>
  )

  return (
    <Layout>
      <div className="">
        {header}
        <div className="mt-20">
          <div className="bg-white px-4 md:px-4 py-10 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-10">
            {inputFields}
            {result}
          </div>
        </div>
        <Toast
          variant={notification?.type}
          title={notification?.title}
          message={notification?.message}
          show={!!notification}
          onClose={() => setNotification(null)}
        />
      </div>
    </Layout>
  )
}

export default ExamplesPage
