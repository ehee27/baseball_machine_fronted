import { store } from '../../app/store'
import { playersApiSlice } from '../players/playersApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    // console.log('subscribing')
    const players = store.dispatch(
      playersApiSlice.endpoints.getPlayers.initiate()
    )
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      // console.log('unsubscribing')
      players.unsubscribe()
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}
export default Prefetch
