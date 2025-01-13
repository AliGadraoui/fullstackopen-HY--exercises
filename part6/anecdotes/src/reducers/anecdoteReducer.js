const initialState = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
  ];
  
  const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEW_ANECDOTE':
        return [...state, action.data];
      default:
        return state;
    }
  };
  
  export const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      data: content,
    };
  };
  
  export default anecdoteReducer;
  