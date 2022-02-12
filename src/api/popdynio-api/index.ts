import popdynioInstance from './instance'

export type Transition = {
  source: string
  dest: string
  alpha: number
  beta: number
  factors: string[]
  includes_n: boolean
}

export type ForecastRequest = {
  ids: string[]
  forecast_time: number
  initial_population: number[]
  transitions: Transition[]
}

export const forecast = (body: ForecastRequest) => popdynioInstance.post('/forecast', body)
