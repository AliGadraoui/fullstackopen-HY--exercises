import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setMessage('Invalid username or password')
      setMessageType('error')
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs([...blogs, newBlog])
      setMessage(`Added '${newBlog.title}' by ${newBlog.author}`)
      setMessageType('success')
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage('Error adding blog')
      setMessageType('error')
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            Username: <input name="username" />
          </div>
          <div>
            Password: <input name="password" type="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={messageType} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="New Blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      ))}
    </div>
  )
}

export default App
