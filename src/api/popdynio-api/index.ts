import popdynioInstance from './instance'

export type SolverMethod = 'ODE' | 'Gillespie' | 'TauLeaping'

export type Transition = {
  source: string
  dest: string
  alpha: number
  factors: string[]
  includes_n: boolean
}

export type ForecastRequest = {
  ids: string[]
  forecast_time: number
  initial_population: number[]
  transitions: Transition[]
  method: SolverMethod
  cut_every: number
}

export const forecast = (body: ForecastRequest) => popdynioInstance.post('/forecast', body)
