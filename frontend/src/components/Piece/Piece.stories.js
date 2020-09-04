import React from 'react'
import Piece from './Piece'

export default {
  component: Piece,
  title: 'Piece',
};

const Template = args => <Piece {...args} />;

export const WhitePiece = Template.bind({});
WhitePiece.args = {
  type: "white-piece"
}

export const BlackPiece = Template.bind({});
BlackPiece.args = {
  type: "black-piece"
}

export const WhiteQueen = Template.bind({});
WhiteQueen.args = {
  type: "white-queen"
}

export const BlackQueen = Template.bind({});
BlackQueen.args = {
  type: "black-queen"
}

export const Move = Template.bind({});
Move.args = {
  type: "move"
}
