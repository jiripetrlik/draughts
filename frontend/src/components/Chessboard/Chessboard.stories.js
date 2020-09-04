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
    whitepieces: [[0, 0], [0, 2]],
    blackpieces: [[6, 2], [5, 3], [4, 4]],
    whitequeens: [[4, 6]],
    blackqueens: [[6, 6], [4, 4]],
    moves: [[1, 1], [1, 3]]
  },
}

export const Empty = Template.bind({});
Empty.args = {
  size: 8,
  player: "white",
  pieces: {
    whitepieces: [],
    blackpieces: [],
    whitequeens: [],
    blackqueens: [],
    moves: []
  },
}

export const WhitePlayer = Template.bind({});
WhitePlayer.args = {
  size: 8,
  player: "white",
  pieces: {
    whitepieces: [[0, 0], [0, 2], [0, 4], [0, 6], [1, 1], [1, 3], [1, 5], [1, 7]],
    blackpieces: [[6, 0], [6, 2], [6, 4], [6, 6], [7, 1], [7, 3], [7, 5], [7, 7]],
    whitequeens: [],
    blackqueens: [],
    moves: []
  },
}

export const BlackPlayer = Template.bind({});
BlackPlayer.args = {
  size: 8,
  player: "black",
  pieces: {
    whitepieces: [[0, 0], [0, 2], [0, 4], [0, 6], [1, 1], [1, 3], [1, 5], [1, 7]],
    blackpieces: [[6, 0], [6, 2], [6, 4], [6, 6], [7, 1], [7, 3], [7, 5], [7, 7]],
    whitequeens: [],
    blackqueens: [],
    moves: []
  },
}
