import React from 'react';
import renderer from 'react-test-renderer';
import Chessboard from '../Chessboard'

test('snapshot test', () => {
    const size = 8
    const player = "white"
    const pieces = {
        Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}],
        Blackpieces: [{X: 6, Y: 2}, {X: 5, Y: 3}],
        Whitequeens: [{X: 4, Y: 6}],
        Blackqueens: [{X: 6, Y: 6}, {X: 4, Y: 4}],
    }

    const tree = renderer
        .create(<Chessboard size={size} player={player} pieces={pieces} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
