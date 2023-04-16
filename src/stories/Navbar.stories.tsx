import React from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import Navbar from '../components/Navbar'
import '../App.css'

export default {
  title: 'interface/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const Primary = Template.bind({})
Primary.args = {}
