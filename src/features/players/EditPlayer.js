import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPlayerById } from './playersApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditPlayerForm from './EditPlayerForm'

const EditPlayer = () => {
  const { id } = useParams()

  const player = useSelector(state => selectPlayerById(state, id))
  const users = useSelector(selectAllUsers)

  const content =
    player && users ? (
      <EditPlayerForm player={player} users={users} />
    ) : (
      <p>Loading...</p>
    )

  return content
}
export default EditPlayer
