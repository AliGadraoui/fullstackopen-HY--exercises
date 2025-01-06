const Notification = ({ message, type }) => {
    if (!message) return null
  
    const style = {
      color: type === 'error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    }
  
    return <div style={style}>{message}</div>
  }
  
  export default Notification
  