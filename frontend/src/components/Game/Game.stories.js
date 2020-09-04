import React from 'react'
import Game from './Game'

export default {
  component: Game,
  title: 'Game',
};

const Template = args => <Game {...args} />;

export const Default = Template.bind({});
Default.args = {
  pieces: {
    whitepieces: [[0, 0], [0, 2]],
    blackpieces: [[6, 2], [5, 3], [4, 4]],
    whitequeens: [[4, 6]],
    blackqueens: [[6, 6], [4, 4]],
    moves: [[1, 1], [1, 3]]
  },
  messages: [
    {
        name: "You",
        text: "Message 1"
    },
    {
        name: "Oponent",
        text: "Longer message"
    },
    {
        name: "You",
        text: "One more message"
    }
]
}
