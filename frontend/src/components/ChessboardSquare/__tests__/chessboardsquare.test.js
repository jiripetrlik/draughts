import React from 'react';
import renderer from 'react-test-renderer';
import ChessboardSquare from '../ChessboardSquare'

test('snapshot test', () => {
    const row = 1
    const column = 2
    const selected = "no"
    const pieceType = "white-piece"

    const tree = renderer
        .create(<ChessboardSquare row={row} column={column} selected={selected} pieceType={pieceType} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
