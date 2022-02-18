import * as React from 'react'
import QuickView from '../QuickView'

export type TutorialTypes = 'groups' | 'transitions' | 'initialPopulation'

export type TutorialQuickViewProps = {
  open?: boolean
  onClose: () => void
  variant: TutorialTypes
}

const TutorialQuickView: React.FC<TutorialQuickViewProps> = ({ variant, open = false, onClose }) => {
  const title = {
    groups: <h1>Defining Groups</h1>,
    transitions: <h1>Defining transitions</h1>,
    initialPopulation: <h1>Tweaks</h1>
  }
  const paragraph = {
    groups: (
      <p className="text-left">
        <ul className="flex flex-col gap-4">
          <li>
            Click on <strong>Add group</strong> for adding a new group to the model.
          </li>
          <li>
            Define the <strong>Name</strong> of each group on the text field.
          </li>
        </ul>
      </p>
    ),
    transitions: (
      <div className="text-left">
        <ul className="flex flex-col gap-4">
          <li>
            Click on <strong>Add transition</strong> for adding a new transition to the model.
          </li>
          <li>
            A Transition must be defined over two models, for each transition you must select the source (
            <strong>From</strong>) and destination (<strong>To</strong>) group.
          </li>
          <li>
            Give a value to <strong>alpha</strong> indicating the rate of occurs the transition.
          </li>
          <li>
            Also, check the groups in the multiselect below to specify that the transition depends on the amount of
            population for each of them.
          </li>
          <li>
            Optionally, you can check <strong>N</strong> to specify that the transition rate depends on the ratio of the
            number of elements in each group participating in the transition, to the total population. This is usually
            true for most of the models so when in doubt mark this option.
          </li>
        </ul>
      </div>
    ),
    initialPopulation: (
      <div className="text-left">
        <ul className="flex flex-col gap-4">
          <li>
            You'll see a number input for each group that you define previously, in this you can define the{' '}
            <strong>Initial Population</strong> that each group will have at starting the simulation.
          </li>
          <li>
            In the <strong>Solver</strong> select you can specify one of our simulation algorithms, test different
            algorithms on your model to evaluate the behavior of each one.
          </li>
          <li>
            Move the <strong>Time</strong> slider to enter the number of iterations that the algorithm will run, for
            each iteration the graphic will plot a point on each group, therefore a greater number of time implies more
            points to plot, which can delay the rendering of the graph. Use consciously with <strong>Steps</strong>{' '}
            value.
          </li>
          <li>
            <strong>Steps</strong> select defines the number of steps between each iteration, the larger the value, the
            greater the jumps and the fewer points are plotted.
          </li>
        </ul>
      </div>
    )
  }

  return <QuickView open={open} onClose={onClose} title={title[variant]} text={paragraph[variant]} />
}

export default TutorialQuickView
