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
    groups: 'Tutorial for Groups',
    transitions: 'Tutorial for transitions',
    initialPopulation: 'Tutorial for initial population'
  }
  const paragraph = {
    groups: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero earum
    repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro, ipsa
    sequi exercitationem quaerat quas voluptatem voluptatibus! paragraph, Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Soluta iure libero earum repellendus beatae dolores possimus sapiente
    cupiditate voluptate architecto atque at porro, ipsa sequi exercitationem quaerat quas voluptatem
    voluptatibus! paragraph, Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero
    earum repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro,
    ipsa sequi exercitationem quaerat quas voluptatem voluptatibus!`,
    transitions: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero earum
    repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro, ipsa
    sequi exercitationem quaerat quas voluptatem voluptatibus! paragraph, Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Soluta iure libero earum repellendus beatae dolores possimus sapiente
    cupiditate voluptate architecto atque at porro, ipsa sequi exercitationem quaerat quas voluptatem
    voluptatibus! paragraph, Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero
    earum repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro,
    ipsa sequi exercitationem quaerat quas voluptatem voluptatibus!`,
    initialPopulation: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero earum
    repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro, ipsa
    sequi exercitationem quaerat quas voluptatem voluptatibus! paragraph, Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Soluta iure libero earum repellendus beatae dolores possimus sapiente
    cupiditate voluptate architecto atque at porro, ipsa sequi exercitationem quaerat quas voluptatem
    voluptatibus! paragraph, Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iure libero
    earum repellendus beatae dolores possimus sapiente cupiditate voluptate architecto atque at porro,
    ipsa sequi exercitationem quaerat quas voluptatem voluptatibus!`
  }

  return <QuickView open={open} onClose={onClose} title={title[variant]} text={paragraph[variant]} />
}

export default TutorialQuickView
