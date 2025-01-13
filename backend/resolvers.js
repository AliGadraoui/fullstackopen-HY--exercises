import Book from './models/book'
import Author from './models/author'
import User from './models/user'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      let books = await Book.find().populate('author')
      if (author) books = books.filter(book => book.author.name === author)
      if (genre) books = books.filter(book => book.genres.includes(genre))
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find()
      return authors.map(a => ({
        name: a.name,
        born: a.born,
        bookCount: Book.countDocuments({ author: a._id })
      }))
    },
    me: (_, __, context) => context.currentUser
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) throw new Error("Unauthorized")
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author })
      await book.save()
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name })
      if (!author) return null
      author.born = setBornTo
      await author.save()
      return author
    },
    createUser: async (_, args) => {
      const user = new User(args)
      await user.save()
      return user
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') throw new Error("Invalid credentials")
      const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET)
      return { value: token }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

export default resolvers
