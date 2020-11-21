import React from 'react';
import renderer from 'react-test-renderer';
import Game from '../Game'

test('snapshot test', () => {
    const pieces = {
        whitepieces: [[0, 0], [0, 2]],
        blackpieces: [[6, 2], [5, 3], [4, 4]],
        whitequeens: [[4, 6]],
        blackqueens: [[6, 6], [4, 4]],
        moves: [[1, 1], [1, 3]]
    };
    const messages = [
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
    ];

    const tree = renderer
        .create(<Game pieces={pieces} messages={messages} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
