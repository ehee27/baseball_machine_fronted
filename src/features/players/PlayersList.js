import './players.css'
import { useGetPlayersQuery } from './playersApiSlice'
import Player from './Player'

const PlayersList = () => {
  const {
    data: players,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPlayersQuery('playersList', {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  console.log('These are the players-----', players)

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = players

    const tableContent = ids?.length
      ? ids.map(playerId => <Player key={playerId} playerId={playerId} />)
      : null

    content = (
      <table className="table table--players">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th player__status">
              Status
            </th>
            {/* <th scope="col" className="table__th player__created">
              Created
            </th>
            <th scope="col" className="table__th player__updated">
              Updated
            </th> */}
            <th scope="col" className="table__th player__fullName">
              Name
            </th>
            <th scope="col" className="table__th player__position">
              Position
            </th>
            <th scope="col" className="table__th player__number">
              Number
            </th>
            {/* <th scope="col" className="table__th player__edit">
              Edit
            </th> */}
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    )

    // content = <div>{tableContent}</div>
  }
  return content

  // return content
}
export default PlayersList
