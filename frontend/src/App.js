import { useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './services/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      alert(`New book added: ${data.data.bookAdded.title}`)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token && <button onClick={() => setPage('add')}>Add Book</button>}
        {token && <button onClick={() => setPage('recommend')}>Recommended</button>}
        {token
          ? <button onClick={logout}>Logout</button>
          : <button onClick={() => setPage('login')}>Login</button>
        }
      </div>

      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {page === 'add' && <NewBook />}
      {page === 'recommend' && <RecommendedBooks />}
      {page === 'login' && <LoginForm setToken={setToken} />}
    </div>
  )
}

export default App
