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
    ]
};
