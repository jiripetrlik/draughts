import React from 'react';
import renderer from 'react-test-renderer';
import NavigationScreen from '../NavigationScreen'

test('snapshot test', () => {
    const players = {
        Waiting: [
            {
                Id: 1,
                Name: "User 1"
            },
            {
                Id: 2,
                Name: "User 2"
            }
        ],
        Playing: [
            {
                id: 1,
                names: ["User 3", "User 4"]
            },
            {
                id: 2,
                names: ["User 5", "User 6"]
            },
            {
                id: 3,
                names: ["User 7", "User 8"]
            },
        ]
    }

    const tree = renderer
        .create(<NavigationScreen players={players} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
