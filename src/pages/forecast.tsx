import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../layouts'
import { PlusSmIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { InformationCircleIcon, RefreshIcon } from '@heroicons/react/outline'
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
import PopulationCard from '../components/PopulationCard'
import { PopulationCardProps } from '../components/PopulationCard/PopulationCard'
import * as api from '../api'
import PopulationTransition, {
  PopulationTransitionProps
} from '../components/PopulationTransition/PopulationTransition'
import Spinner from '../components/Spinner'
import { Transition, SolverMethod } from '../api'
import Select from '../components/Select'
import Option from '../components/Option'
import Toast from '../components/Toast'
import { Transition as HeadlessUiTransition } from '@headlessui/react'
import { TutorialTypes } from '../components/TutorialQuickView/TutorialQuickView'
import TutorialQuickView from '../components/TutorialQuickView'
import { colors } from '../styles/color.palette'

const Forecast: NextPage = () => {
  const [transitions, setTransitions] = React.useState<Partial<PopulationTransitionProps>[]>([])
  const [lastGroupIndex, setLastGroupIndex] = React.useState(1)
  const [groups, setGroups] = React.useState<Partial<PopulationCardProps>[]>([{ name: `P${lastGroupIndex}` }])
  const [initialPopulation, setInitialPopulation] = React.useState([100])
  const [time, setTime] = React.useState(50)
  const [plotData, setPlotData] = React.useState<Object>(null)
  const [loading, setLoading] = React.useState(false)
  const [solverMethod, setSolverMethod] = React.useState<SolverMethod>('ODE')
  const [notification, setNotification] = React.useState<{
    type: 'error' | 'success'
    title: string
    message: string
  }>(null)
  const [openTutorialModal, setOpenTutorialModal] = React.useState<TutorialTypes>(null)
  const [steps, setSteps] = React.useState(5)

  const handleRun = () => {
    setLoading(true)
    const mappedTransitions = transitions.map(t => {
      return {
        alpha: parseFloat(t?.alpha?.toString()),
        source: t.source,
        dest: t.dest,
        factors: t.factors || [],
        includes_n: t.includesN || false
      } as Transition
    })
    api
      .forecast({
        ids: groups.map(group => group.name),
        forecast_time: time * 10,
        transitions: mappedTransitions,
        initial_population: initialPopulation,
        method: solverMethod,
        cut_every: steps
      })
      .then(response => {
        setLoading(false)
        const newDatasets = []
        groups.forEach((group, i) => {
          let randomColor = colors[i]
          if (!randomColor) {
            randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
          }
          newDatasets.push({
            label: group.name,
            data: response.data.forecast[group.name],
            borderColor: randomColor
          })
        })
        const newData = {
          labels: response.data.time,
          datasets: newDatasets
        }
        setPlotData(newData)
      })
      .catch(err => {
        console.error(err?.message)
        setNotification({
          type: 'error',
          title: 'Ups!',
          message: err?.response?.data?.detail || 'There was an error with the API'
        })
        setPlotData(null)
        setLoading(false)
      })
  }

  const handleRefresh = () => {
    setGroups([{ name: 'P1' }])
    setLastGroupIndex(1)
    setTransitions([])
    setInitialPopulation([100])
  }

  const handleAddEmptyGroup = () => {
    setGroups([...groups, { name: `P${lastGroupIndex + 1}` }])
    setLastGroupIndex(lastGroupIndex + 1)
    setInitialPopulation(initialPopulation.concat([100]))
  }
  const handleChangeGroupName = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    const list = [...groups]
    list[index].name = value
    setGroups(list)
  }
  const handleDeleteGroup = (index: number) => () => {
    const list = [...groups]
    const pop = [...initialPopulation]
    list.splice(index, 1)
    pop.splice(index, 1)
    setGroups(list)
    setInitialPopulation(pop)
  }

  const handleChangeTransition = (index: number, field: string) => {
    const setField = (field, value) => {
      const list = [...transitions]
      list[index][field] = value
      setTransitions(list)
    }
    if (field === 'includesN') {
      const transition = transitions[index]
      return () => setField(field, !transition.includesN)
    }
    if (['source', 'dest'].includes(field)) {
      return (newVal: string | number) => setField(field, newVal)
    } else if (field === 'alpha') {
      return (ev: React.ChangeEvent<HTMLInputElement>) => setField(field, ev.target.value)
    }
  }
  const handleAddEmptyTransition = () => setTransitions([...transitions, {}])
  const handleDeleteTransition = (index: number) => () => {
    const list = [...transitions]
    list.splice(index, 1)
    setTransitions(list)
  }
  const handleAddTransitionFactor = (index: number) => (newFactor: string) => {
    const list = [...transitions]
    const transition = list[index]
    if (!transition.factors) {
      transition.factors = [newFactor]
    } else {
      transition.factors.push(newFactor)
      transition.factors = transition.factors.filter((item, i, arr) => arr.indexOf(item) === i)
    }
    setTransitions(list)
  }
  const handleRemoveTransitionFactor = (index: number) => (factor: string) => {
    const list = [...transitions]
    const transition = list[index]
    if (transition.factors.length > 0) {
      const foundIndex = transition.factors.findIndex(e => e === factor)
      transition.factors.splice(foundIndex, 1)
    }
    setTransitions(list)
  }

  const handleChangeInitialPopulation = (index: number) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    const list = [...initialPopulation]
    list[index] = parseInt(ev.target.value)
    setInitialPopulation(list)
  }

  const groupsList = (
    <HeadlessUiTransition
      show
      appear
      enter="transform transition duration-500 delay-100"
      enterFrom="translate-y-20 opacity-0"
      enterTo="translate-y-0 opacity-100">
      <div className="w-full flex flex-col justify-center items-center pt-2 border rounded-md md:shadow-xl pb-10 bg-white relative">
        <div className="absolute right-5 top-5">
          <InformationCircleIcon
            className="h-7 w-7 text-blue-700 rounded-full cursor-pointer hover:bg-blue-50 transition duration-500"
            onClick={() => setOpenTutorialModal('groups')}
          />
        </div>
        <div className="text-4xl font-semibold text-gray-700 text-left">Groups</div>
        <div className="mt-4 w-full flex flex-col gap-1 divide-y h-96 overflow-y-scroll border rounded-md border-gray-100">
          {groups.map((card, i) => (
            <div key={`group-card-${i}`} className="px-3 md:px-0">
              <PopulationCard
                name={card.name}
                onChangeName={handleChangeGroupName(i)}
                onDelete={handleDeleteGroup(i)}
              />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <button
            className="rounded-3xl bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3 cursor-pointer transition duration-300 inline-flex items-center text-white"
            onClick={handleAddEmptyGroup}>
            <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Add group</span>
          </button>
        </div>
      </div>
    </HeadlessUiTransition>
  )

  const transitionsList = (
    <HeadlessUiTransition
      show
      appear
      enter="transform transition duration-700 delay-100"
      enterFrom="translate-y-20 opacity-0"
      enterTo="translate-y-0 opacity-100">
      <div className="w-full flex flex-col justify-center items-center pt-2 border rounded-md md:shadow-xl pb-10 bg-white relative">
        <div className="absolute right-5 top-5">
          <InformationCircleIcon
            className="h-7 w-7 text-blue-700 rounded-full cursor-pointer hover:bg-blue-50 transition duration-500"
            onClick={() => setOpenTutorialModal('transitions')}
          />
        </div>
        <div className="text-4xl font-semibold text-gray-700 text-left">Transitions</div>
        <div className="mt-4 w-full grid grid-cols-1 divide-y h-96 overflow-y-scroll border border-gray-100">
          {transitions.map((transition, i) => (
            <PopulationTransition
              key={`transition-card-${i}`}
              groups={groups.map(group => group.name)}
              source={transition.source}
              dest={transition.dest}
              factors={transition.factors}
              includesN={transition.includesN}
              alpha={transition.alpha}
              onChangeAlpha={handleChangeTransition(i, 'alpha') as any}
              onChangeSource={handleChangeTransition(i, 'source') as any}
              onChangeDest={handleChangeTransition(i, 'dest') as any}
              onToggleIncludesN={handleChangeTransition(i, 'includesN') as any}
              onAddFactor={handleAddTransitionFactor(i)}
              onRemoveFactor={handleRemoveTransitionFactor(i)}
              onDelete={handleDeleteTransition(i)}
            />
          ))}
        </div>
        <div className="mt-10">
          <button
            className="rounded-3xl bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3 cursor-pointer transition duration-300 inline-flex items-center text-white"
            onClick={handleAddEmptyTransition}>
            <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Add transition</span>
          </button>
        </div>
      </div>
    </HeadlessUiTransition>
  )

  const initialPopulationComponent = (
    <div>
      <div className="relative mb-4">
        <h1 className="text-left text-4xl font-semibold text-gray-700">Initial population</h1>
        <div className="absolute right-5 top-3">
          <InformationCircleIcon
            className="h-7 w-7 text-blue-700 rounded-full cursor-pointer hover:bg-blue-50 transition duration-500"
            onClick={() => setOpenTutorialModal('initialPopulation')}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 h-56 border p-2 rounded-lg overflow-y-scroll">
        {initialPopulation.map((pop, i) => (
          <div key={`initial-population-${i}`}>
            <label htmlFor={`initial-population-${i}`} className="text-gray-700 font-medium text-sm">
              {groups[i].name}
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

  const timeAndRunComponent = (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 space-y-10 space-x-10">
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex gap-10 items-center">
          <div className="w-40">
            <Select
              label="Solver"
              name={solverMethod || ''}
              value={solverMethod || ''}
              onChange={newVal => setSolverMethod(newVal as SolverMethod)}>
              <Option value="ODE">ODE</Option>
              <Option value="Gillespie">Gillespie</Option>
              <Option value="TauLeaping">TauLeaping</Option>
            </Select>
          </div>
          <div className="w-40">
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
      </div>
      <div className="flex justify-end">
        <button
          className="h-20 w-40 bg-green-400 rounded-2xl text-3xl text-white font-extrabold px-4 hover:bg-green-600 transition duration-300 focus:outline-none"
          onClick={handleRun}>
          <div className="flex items-center justify-center">
            <ChevronRightIcon className="h-10 w-10" /> Run
          </div>
        </button>
      </div>
    </div>
  )

  const forecastSettings = (
    <div className="px-4 divide-y">
      {initialPopulationComponent}
      {timeAndRunComponent}
    </div>
  )

  const loadingState = (
    <div className="w-full h-96 flex items-center justify-center">
      <Spinner />
    </div>
  )

  const resultsSide = (
    <div className="w-full">
      <div className="">
        {loading ? loadingState : <div className="w-full">{plotData && <Line data={plotData as any} />}</div>}
      </div>
    </div>
  )

  const header = (
    <div className="flex justify-between">
      <h1 className="font-semibold text-2xl md:text-4xl flex items-center gap-10 text-gray-200">
        New forecast simulation
      </h1>
      <button
        className="w-40 flex justify-between items-center bg-white p-2 rounded-md shadow group hover:bg-gray-100 transition duration-200 focus:outline-none focus:border-none"
        onClick={handleRefresh}>
        <span className="text-gray-900 font-medium">Refresh</span>
        <RefreshIcon className="w-6 h-6 md:w-8 md:h-8 text-green-600 font-bold rounded-full cursor-pointer transition duration-700 group-hover:transform group-hover:rotate-180" />
      </button>
    </div>
  )

  return (
    <Layout>
      {header}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20 pb-10">
        {groupsList}
        {transitionsList}
        {forecastSettings}
        {resultsSide}
      </div>
      <Toast
        variant={notification?.type}
        title={notification?.title}
        message={notification?.message}
        show={!!notification}
        onClose={() => setNotification(null)}
      />
      <TutorialQuickView
        variant={openTutorialModal}
        open={!!openTutorialModal}
        onClose={() => setOpenTutorialModal(null)}
      />
    </Layout>
  )
}

export default Forecast
