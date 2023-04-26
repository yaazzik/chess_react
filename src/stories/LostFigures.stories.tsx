import React from 'react'
import { ComponentStory, Meta } from '@storybook/react'
import LostFigures from '../components/LostFigures'
import '../App.css'
import { Figure } from '../models/figures/chess/Figure'
import { Colors } from '../models/Colors'

export default {
  title: 'interface/LostFigures',
  component: LostFigures,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof LostFigures>

const Template: ComponentStory<typeof LostFigures> = (args) => <LostFigures {...args} />

export const Primary = Template.bind({})
Primary.args = {
  figures: [

  ],
  title: 'Потерянные'
}
