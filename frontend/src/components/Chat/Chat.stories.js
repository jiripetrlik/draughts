import React from 'react'
import Chat from './Chat'

export default {
  component: Chat,
  title: 'Chat',
};

const Template = args => <Chat {...args} />;

export const Default = Template.bind({});
Default.args = {
  messages: []
};

export const WithMessages = Template.bind({});
WithMessages.args = {
  messages: [
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
    ]
};
