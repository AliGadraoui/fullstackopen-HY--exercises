import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../services/queries'
import SetBirthYear from './SetBirthYear'

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || 'N/A'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={data.allAuthors} />
    </div>
  )
}

export default Authors
