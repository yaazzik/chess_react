import React from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import Board from '../components/board/ChessBoard'
import '../App.css'

export default {
  title: 'board/Board',
  component: Board,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta<typeof Board>

const Template: ComponentStory<typeof Board> = () => <Board />

export const Primary = Template.bind({})
Primary.args = {}
