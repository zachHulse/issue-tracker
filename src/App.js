import React from 'react';

import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './pages/Login';
import Messages from './components/Messages';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
      <Messages />
    </QueryClientProvider>
  );
}

export default App;
