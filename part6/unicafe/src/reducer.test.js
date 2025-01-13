import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  test('should return initial state when called with undefined state', () => {
    const state = {};
    const action = { type: 'DO_NOTHING' };
    deepFreeze(state);
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual({ good: 0, ok: 0, bad: 0 });
  });

  test('good is incremented', () => {
    const state = { good: 0, ok: 0, bad: 0 };
    const action = { type: 'GOOD' };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });
});
