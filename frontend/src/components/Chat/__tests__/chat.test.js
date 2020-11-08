import React from 'react';
import renderer from 'react-test-renderer';
import Chat from '../Chat'

test('snapshot test', () => {
    const messages = [
        {
            Name: "You",
            Text: "Message 1"
        },
        {
            Name: "Oponent",
            Text: "Longer message"
        },
        {
            Name: "You",
            Text: "One more message"
        }
    ];

    const tree = renderer
        .create(<Chat messages={messages} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
