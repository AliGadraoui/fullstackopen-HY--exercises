const initialState = [
    { content: 'If it hurts, do it more often', id: 1, votes: 0 },
    { content: 'Adding manpower to a late software project makes it later!', id: 2, votes: 0 },
  ];
  
  export const createAnecdote = (content) => {
    return {
      type: 'CREATE_ANECDOTE',
      data: { content, id: Math.random().toString(36).substring(2, 15), votes: 0 },
    };
  };
  
  const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_ANECDOTE':
        return [...state, action.data];
      default:
        return state;
    }
  };
  
  export default anecdoteReducer;
  