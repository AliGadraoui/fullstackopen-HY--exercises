import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../services/mutations'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState('')
  const [addBook] = useMutation(ADD_BOOK)

  const submit = async (event) => {
    event.preventDefault()
    await addBook({ variables: { title, author, published: Number(published), genres: genres.split(',') } })
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres('')
  }

  return (
    <div>
      <h2>Add a new book</h2>
      <form onSubmit={submit}>
        <div>Title <input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
        <div>Author <input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>Published <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} /></div>
        <div>Genres <input value={genres} onChange={({ target }) => setGenres(target.value)} /></div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default NewBook
