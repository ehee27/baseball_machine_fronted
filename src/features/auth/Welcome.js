import { Link } from 'react-router-dom'
import './welcome.css'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
  const content = (
    <section className="welcome">
      <p>{today}</p>
      <div className="welcome-title">
        <h1>Welcome</h1>
      </div>
      <div className="welcome-links">
        <button>
          <Link to="/dash/players">PLAYERS</Link>
        </button>
        <button>
          <Link to="/dash/players/new">CREATE PLAYER</Link>
        </button>
        <button>
          <Link to="/dash/users">USERS</Link>
        </button>
        <button>
          <Link to="/dash/users/new">CREATE USER</Link>
        </button>
        <button>
          <Link to="/login">LOGIN</Link>
        </button>
      </div>
    </section>
  )
  return content
}

export default Welcome
