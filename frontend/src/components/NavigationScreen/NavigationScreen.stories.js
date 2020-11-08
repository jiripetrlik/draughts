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
  },
};
