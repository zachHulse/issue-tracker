import { useEffect, useState } from 'react';

let session = {
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  isAdmin: localStorage.getItem('isAdmin'),
};
let listeners = [];

export const setSession = async (token, email, isAdmin) => {
  session = { token, email, isAdmin };
  await localStorage.setItem('token', token);
  await localStorage.setItem('email', email);
  await localStorage.setItem('isAdmin', isAdmin);
  listeners.forEach((listener) => listener(session));
};

export const clearSession = () => {
  session = {};
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('isAdmin');
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
