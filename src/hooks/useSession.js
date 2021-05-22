import { useEffect, useState } from 'react';

let session = {
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
};
let listeners = [];

export const setSession = (token, email) => {
  session = { token, email };
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  listeners.forEach((listener) => listener(session));
};

export const clearSession = () => {
  session = {};
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};

export default function useSession() {
  const newListener = useState()[1];
  useEffect(() => {
    // Called just after component mount
    listeners.push(newListener);
    return () => {
      // Called just before the component unmount
      listeners = listeners.filter((listener) => listener !== newListener);
    };
  }, [newListener]);
  return { session, setSession, clearSession };
}
