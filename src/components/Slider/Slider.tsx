import * as React from 'react'

export type SliderProps = JSX.IntrinsicElements['input']

const Slider: React.FC<SliderProps> = ({ ...props }) => {
  return <input className="" type="range" {...props} />
}

export default Slider
