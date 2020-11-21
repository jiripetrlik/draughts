import React from 'react';
import renderer from 'react-test-renderer';
import NameInput from '../NameInput'

test('snapshot test', () => {
    const tree = renderer
        .create(<NameInput />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
