import React from 'react'
import Chessboard from "./Chessboard"

export default {
  component: Chessboard,
  title: 'Chessboard',
};

const Template = args => <Chessboard {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 8,
  player: "white",
  pieces: {
    Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}],
    Blackpieces: [{X: 6, Y: 2}, {X: 5, Y: 3}, {X: 4, Y: 4}],
    Whitequeens: [{X: 4, Y: 6}],
    Blackqueens: [{X: 6, Y: 6}, {X: 4, Y: 4}],
  },
}

export const Empty = Template.bind({});
Empty.args = {
  size: 8,
  player: "white",
  pieces: {
    Whitepieces: [],
    Blackpieces: [],
    Whitequeens: [],
    Blackqueens: [],
  },
}

export const WhitePlayer = Template.bind({});
WhitePlayer.args = {
  size: 8,
  player: "white",
  pieces: {
    Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}, {X: 0, Y: 4}, {X: 0, Y: 6}, {X: 1, Y: 1}, {X: 1, Y: 3}, {X: 1, Y: 5}, {X: 1, Y: 7}],
    Blackpieces: [{X: 6, Y: 0}, {X: 6, Y: 2}, {X: 6, Y: 4}, {X: 6, Y: 6}, {X: 7, Y: 1}, {X: 7, Y: 3}, {X: 7, Y: 5}, {X: 7, Y: 7}],
    Whitequeens: [],
    Blackqueens: [],
  },
}

export const BlackPlayer = Template.bind({});
BlackPlayer.args = {
  size: 8,
  player: "black",
  pieces: {
    Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}, {X: 0, Y: 4}, {X: 0, Y: 6}, {X: 1, Y: 1}, {X: 1, Y: 3}, {X: 1, Y: 5}, {X: 1, Y: 7}],
    Blackpieces: [{X: 6, Y: 0}, {X: 6, Y: 2}, {X: 6, Y: 4}, {X: 6, Y: 6}, {X: 7, Y: 1}, {X: 7, Y: 3}, {X: 7, Y: 5}, {X: 7, Y: 7}],
    Whitequeens: [],
    Blackqueens: [],
  },
}
