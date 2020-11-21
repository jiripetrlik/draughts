import React from 'react';
import renderer from 'react-test-renderer';
import OponentWaiting from '../OponentWaiting'

test('snapshot test', () => {
    const tree = renderer
        .create(<OponentWaiting />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
