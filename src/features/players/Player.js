import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPlayerById } from './playersApiSlice'

const Player = ({ playerId }) => {
  const player = useSelector(state => selectPlayerById(state, playerId))
  // console.log('This is the SINGLE player...', player)

  const navigate = useNavigate()

  if (player) {
    // we obtain the 'createdAt' and 'updatedAt' values from MongoDB
    const created = new Date(player.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })
    // we obtain the 'createdAt' and 'updatedAt' values from MongoDB
    const updated = new Date(player.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    })

    const handleEdit = () => navigate(`/dash/players/${playerId}`)

    return (
      <tr className="table__row">
        <td className="table__cell player__status">
          {player.active ? (
            <span className="player__status--active">Active</span>
          ) : (
            <span className="player__status--inactive">Inactive</span>
          )}
        </td>
        <td className="table__cell player__fullName">{player.fullName}</td>
        <td className="table__cell player__position">{player.position}</td>
        <td className="table__cell player__number">{player.number}</td>
        {/* <td className="table__cell player__created">{created}</td>
        <td className="table__cell player__updated">{updated}</td> */}

        {/* <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td> */}
      </tr>
    )
  } else return null
}
export default Player
