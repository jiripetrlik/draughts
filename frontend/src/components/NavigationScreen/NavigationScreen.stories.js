import React from 'react'
import NavigationScreen from './NavigationScreen'

export default {
  component: NavigationScreen,
  title: 'NavigationScreen',
};

const Template = args => <NavigationScreen {...args} />;

export const Default = Template.bind({});
Default.args = {
  players: {
    Waiting: [

    ],
    Playing: [

    ]
  },
};

export const Filled = Template.bind({});
Filled.args = {
    players: {
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
    },
  };
