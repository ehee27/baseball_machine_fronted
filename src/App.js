import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/dash/DashLayout'
import Welcome from './features/auth/Welcome'
import PlayersList from './features/players/PlayersList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditPlayer from './features/players/EditPlayer'
import NewPlayer from './features/players/NewPlayer'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        {/* PRE-FETCH our data so dash has it */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            {/* EVERYTHING BELOW WRAPPED BEHIND PROTECTED DASH */}
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              {/* TOP LINE IS PARENT ROUTE or 'INDEX' - CHILDREN are WRAPPED */}
              <Route path="players">
                <Route index element={<PlayersList />} />
                <Route path=":id" element={<EditPlayer />} />
                <Route path="new" element={<NewPlayer />} />
              </Route>
              {/* TOP LINE IS PARENT ROUTE or 'INDEX' - CHILDREN are WRAPPED */}
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>
            </Route>
          </Route>
          {/*END OF DASH */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
