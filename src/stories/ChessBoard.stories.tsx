import React from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import ChessBoard from '../components/board/ChessBoard'
import '../App.css'

export default {
  title: 'board/ChessBoard',
  component: ChessBoard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof ChessBoard>

const Template: ComponentStory<typeof ChessBoard> = () => <ChessBoard />

export const Primary = Template.bind({})
Primary.args = {}
