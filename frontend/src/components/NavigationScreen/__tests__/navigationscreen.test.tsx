import React from 'react';
import renderer from 'react-test-renderer';
import NavigationScreen from '../NavigationScreen'

test('snapshot test', () => {
    const players = {
        Waiting: [
            {
                ID: 1,
                Name: "User 1"
            },
            {
                ID: 2,
                Name: "User 2"
            }
        ],
        Playing: [
            {
                ID: 1,
                Names: ["User 3", "User 4"]
            },
            {
                ID: 2,
                Names: ["User 5", "User 6"]
            },
            {
                ID: 3,
                Names: ["User 7", "User 8"]
            },
        ]
    }

    const tree = renderer
        .create(<NavigationScreen players={players} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
