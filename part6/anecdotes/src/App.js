import { useDispatch, useSelector } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>

      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default App;
