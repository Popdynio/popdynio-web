import * as React from 'react'

import QuickView from '../QuickView'
import Button from '../Button'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

type DiffEquation = Object & {
  ids: string[]
}

export type DiffEquationButtonProps = {
  diffEquation: DiffEquation
}

const DiffEquationButton: React.FC<DiffEquationButtonProps> = ({ diffEquation }) => {
  const [open, setOpen] = React.useState(false)

  const handleShowTransitionFactor = factor => {
    const { includes_n: includesN, alpha, factors } = factor
    let N = ''
    if (includesN) {
      if (factors.length === 0 || factors.length === 1) {
        N = ''
      } else if (factors.length === 2) {
        N = `$\\cdot \\frac{1}{N}$`
      } else {
        N = `$\\cdot \\frac{1}{N^${factors.length - 1}}$`
      }
    }
    return `${alpha} $\\cdot$ ${factors.join(' $\\cdot$ ')} ${N}`
  }

  const handleShowEquation = (group: string, inOuts) => {
    const ins = inOuts.in.map(factor => handleShowTransitionFactor(factor)).join(' + ')
    const outs = inOuts.out.map(factor => handleShowTransitionFactor(factor)).join(' + ')

    const rightMember = ins + (outs.length > 0 ? ` $-$ (${outs})` : '')
    const leftMember = `$\\frac{\\partial ${group}}{\\partial t}$`

    if (!ins.length && !outs.length) {
      return ''
    }
    return `${leftMember} = ${rightMember}`
  }

  const handleShowEquations = diffEquation => {
    const groups = diffEquation.ids
    const equations = groups.map((group, i) => {
      return `${handleShowEquation(group, diffEquation[group])}`
    })

    return equations
  }
  const handleParseLatexEquation = (eq, i) => {
    if (!eq) {
      return <></>
    }
    return (
      <>
        <Latex>{`$(${i})$`}</Latex>
        <Latex>{eq}</Latex>
      </>
    )
  }

  const latexEquations: (React.ReactNode & string)[] = handleShowEquations(diffEquation)

  const title = <span>ODEs System</span>

  const body = (
    <div className="flex flex-col gap-4 text-lg md:text-xl text-left pl-0 md:pl-20">
      {latexEquations.map((eq, i) => (
        <div className="flex gap-4" key={`equation-${i}`}>
          {handleParseLatexEquation(eq, i)}
        </div>
      ))}
    </div>
  )

  return (
    <>
      <Button size="huge" onClick={() => setOpen(true)}>
        Show ODE System
      </Button>
      <QuickView open={open} onClose={() => setOpen(false)} title={title} text={body} />
    </>
  )
}

export default DiffEquationButton
