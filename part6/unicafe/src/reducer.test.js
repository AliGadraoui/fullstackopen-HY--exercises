import deepFreeze from "deep-freeze";
import counterReducer, { good } from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return initial state when called with undefined state", () => {
    const state = {};
    const action = { type: "DO_NOTHING" };
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("increments good", () => {
    const action = good();
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });
});
