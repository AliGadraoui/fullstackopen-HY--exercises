import { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Cancel' : buttonLabel}
      </button>
      {visible && <div>{children}</div>}
    </div>
  )
}

export default Togglable
