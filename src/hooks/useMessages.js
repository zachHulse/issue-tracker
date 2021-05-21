import { useEffect, useState } from 'react';

import * as constants from '../constants';

let messages = {};
let listeners = [];

const setMessages = (newMessages) => {
  messages = newMessages;
  listeners.forEach((listener) => listener(messages));
};

export const addMessage = (text, type = constants.MESSAGE_TYPE_INFO) => {
  setMessages({ ...messages, [text]: type });
};

const removeMessage = (text) => {
  const newMessages = { ...messages };
  delete newMessages[text];
  setMessages(newMessages);
};

export default function useMessages() {
  const newListener = useState()[1];
  useEffect(() => {
    // Called just after component mount
    listeners.push(newListener);
    return () => {
      // Called just before the component unmount
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  }, [newListener]);
  return { messages, addMessage, removeMessage };
}
