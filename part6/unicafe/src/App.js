import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state);

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset stats</button>

      <h2>Statistics</h2>
      <p>good: {counter.good}</p>
      <p>ok: {counter.ok}</p>
      <p>bad: {counter.bad}</p>
    </div>
  );
};

export default App;
