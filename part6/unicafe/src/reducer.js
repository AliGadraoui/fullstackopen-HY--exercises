const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

export const good = () => ({ type: "GOOD" });
export const ok = () => ({ type: "OK" });
export const bad = () => ({ type: "BAD" });
export const zero = () => ({ type: "ZERO" });

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      return { ...state, good: state.good + 1 };
    case "OK":
      return { ...state, ok: state.ok + 1 };
    case "BAD":
      return { ...state, bad: state.bad + 1 };
    case "ZERO":
      return initialState; // Reset state
    default:
      return state;
  }
};

export default counterReducer;
