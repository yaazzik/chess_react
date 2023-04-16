import React from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import Timer from '../components/Timer'
import '../App.css'

export default {
  title: 'interface/Timer',
  component: Timer,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof Timer>

const Template: ComponentStory<typeof Timer> = (args) => <Timer {...args} />

export const Primary = Template.bind({})
Primary.args = {}
