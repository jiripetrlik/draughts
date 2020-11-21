import React from 'react';
import renderer from 'react-test-renderer';
import Piece from '../Piece'

test('snapshot test', () => {
    const type = "white-piece"

    const tree = renderer
        .create(<Piece type={type} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
