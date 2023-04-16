import React from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import LostFigures from '../components/LostFigures'
import '../App.css'

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
