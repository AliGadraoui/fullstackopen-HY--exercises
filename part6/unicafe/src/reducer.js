const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }  // Increment 'good'
    case 'OK':
      return { ...state, ok: state.ok + 1 }      // Increment 'ok'
    case 'BAD':
      return { ...state, bad: state.bad + 1 }    // Increment 'bad'
    case 'ZERO':
      return initialState                        // Reset state
    default:
      return state
  }
}

export default counterReducer
