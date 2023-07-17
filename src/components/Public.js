import { Link } from 'react-router-dom'

import React from 'react'

const Public = () => {
  return (
    <div className="app">
      <main>
        <h1>
          Baseball <span>Machine</span>
        </h1>
        <div className="spacer">
          <p>
            <em>Subtitle goes right here</em>
          </p>
        </div>

        <button>
          <Link to="/login">LOGIN</Link>
        </button>
      </main>
    </div>
  )
}

export default Public
