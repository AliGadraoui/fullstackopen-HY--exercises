import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Menu from './components/Menu';

const App = () => {
  return (
    <div>
      <Menu />
      <Notification />
      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="/create" element={<AnecdoteForm />} />
      </Routes>
    </div>
  );
};

export default App;
