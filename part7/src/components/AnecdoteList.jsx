import React from 'react';
import { useSelector } from 'react-redux';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>{anecdote.content}</div>
      ))}
    </div>
  );
};

export default AnecdoteList;
