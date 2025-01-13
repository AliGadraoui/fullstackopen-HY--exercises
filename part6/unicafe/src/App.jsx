import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { good, ok, bad, zero } from "./reducer"; 

const App = () => {
  const dispatch = useDispatch();
  const feedback = useSelector((state) => state); 
  
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => dispatch(good())}>good</button>
      <button onClick={() => dispatch(ok())}>ok</button>
      <button onClick={() => dispatch(bad())}>bad</button>
      <button onClick={() => dispatch(zero())}>reset stats</button>
      <h2>Statistics</h2>
      <p>good: {feedback.good}</p>
      <p>ok: {feedback.ok}</p>
      <p>bad: {feedback.bad}</p>
    </div>
  );
};

export default App;
