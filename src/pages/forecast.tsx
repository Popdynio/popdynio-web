import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../layouts'
import { PlusSmIcon, RefreshIcon } from '@heroicons/react/solid'
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
import { Transition } from '../api'

const Forecast: NextPage = () => {
  const [transitions, setTransitions] = React.useState<Partial<PopulationTransitionProps>[]>([])
  const [lastGroupIndex, setLastGroupIndex] = React.useState(1)
  const [groups, setGroups] = React.useState<Partial<PopulationCardProps>[]>([{ name: `P-${lastGroupIndex}` }])
  const [initialPopulation, setInitialPopulation] = React.useState([100])
  const [time, setTime] = React.useState(100)
  const [plotData, setPlotData] = React.useState<Object>(null)
  const [loading, setLoading] = React.useState(false)

  const handleRun = () => {
    setLoading(true)
    const mappedTransitions = transitions.map(t => {
      return {
        alpha: parseFloat(t.alpha.toString()),
        beta: parseFloat(t.beta.toString()),
        source: t.source,
        dest: t.dest,
        factors: t.factors || [],
        includes_n: t.includesN || false
      } as Transition
    })
    api
      .forecast({
        ids: groups.map(group => group.name),
        forecast_time: time * 5,
        transitions: mappedTransitions,
        initial_population: initialPopulation
      })
      .then(response => {
        setLoading(false)
        const newDatasets = []
        groups.forEach(group => {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16)
          newDatasets.push({
            label: group.name,
            data: response.data.forecast[group.name],
            borderColor: '#' + randomColor
            // backgroundColor: 'rgb(255, 100, 100)'
          })
        })
        const newData = {
          labels: response.data.time,
          datasets: newDatasets
        }
        setPlotData(newData)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const handleRefresh = () => {
    setGroups([{ name: 'P-1' }])
    setLastGroupIndex(1)
    setTransitions([])
    setInitialPopulation([100])
  }

  const handleAddEmptyGroup = () => {
    setGroups([...groups, { name: `P-${lastGroupIndex + 1}` }])
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
    } else if (['alpha', 'beta'].includes(field)) {
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
    <div className="w-full flex flex-col justify-center items-center pt-2 rounded-lg md:shadow-xl pb-10">
      <div className="text-4xl font-semibold text-gray-700 text-left">Groups</div>
      <div className="mt-4 w-full flex flex-col gap-1 divide-y h-96 overflow-y-scroll border border-gray-100">
        {groups.map((card, i) => (
          <PopulationCard
            key={`card-${i}`}
            name={card.name}
            onChangeName={handleChangeGroupName(i)}
            onDelete={handleDeleteGroup(i)}
          />
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
  )

  const transitionsList = (
    <div className="w-full flex flex-col justify-center items-center pt-2 rounded-lg md:shadow-xl pb-10">
      <div className="text-4xl font-semibold text-gray-700 text-left">Transitions</div>
      <div className="mt-4 w-full grid grid-cols-1 divide-y h-96 overflow-y-scroll border border-gray-100">
        {transitions.map((transition, i) => (
          <PopulationTransition
            key={`card-${i}`}
            groups={groups.map(group => group.name)}
            source={transition.source}
            dest={transition.dest}
            factors={transition.factors}
            includesN={transition.includesN}
            alpha={transition.alpha}
            beta={transition.beta}
            onChangeAlpha={handleChangeTransition(i, 'alpha') as any}
            onChangeBeta={handleChangeTransition(i, 'beta') as any}
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
  )
  const initialPopulationComponent = (
    <div>
      <h1 className="text-center text-4xl font-semibold text-gray-700">Initial population</h1>
      <div className="flex flex-col gap-2">
        {initialPopulation.map((pop, i) => (
          <>
            <label htmlFor={`initial-population-${i}`} className="text-gray-700 font-medium text-sm">
              {groups[i].name}
            </label>
            <input
              key={`initial-population-${i}`}
              className="w-2/3 shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md focus:outline-none font-bold text-gray-700"
              name={`initial-population-${i}`}
              value={pop}
              onChange={handleChangeInitialPopulation(i)}
              type="number"
            />
          </>
        ))}
      </div>
    </div>
  )

  const timeAndRunComponent = (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 space-y-10 space-x-10">
      <div className="mt-20">
        <label htmlFor="range" className="font-bold text-gray-600">
          Time: {time * 5}
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
          className="h-20 w-40 bg-green-400 rounded-2xl text-3xl text-white font-extrabold hover:outline-none"
          onClick={handleRun}>
          Run
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

  return (
    <Layout>
      <h1 className="font-semibold text-2xl md:text-4xl flex items-center gap-10">
        Please specify your input
        <RefreshIcon
          className="w-8 h-8 md:w-10 md:h-10 text-green-600 font-bold bg-green-50 rounded-full cursor-pointer"
          onClick={handleRefresh}
        />
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
        {groupsList}
        {transitionsList}
        {forecastSettings}
        {resultsSide}
      </div>
    </Layout>
  )
}

export default Forecast
