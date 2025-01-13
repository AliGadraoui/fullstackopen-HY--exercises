export const setNotification = (message) => {
    return {
      type: 'SET_NOTIFICATION',
      data: message,
    };
  };
  
  const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data;
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  