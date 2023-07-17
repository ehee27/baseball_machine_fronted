import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
      <div className="app">
        <main>
          <DashHeader />
          <div className="dash-container">
            <Outlet />
          </div>
          <DashFooter />
        </main>
      </div>
    </>
  )
}

export default DashLayout
