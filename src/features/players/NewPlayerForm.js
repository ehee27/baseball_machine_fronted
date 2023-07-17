import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewPlayerMutation } from './playersApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewPlayerForm = ({ users }) => {
  const [addNewPlayer, { isLoading, isSuccess, isError, error }] =
    useAddNewPlayerMutation()

  const navigate = useNavigate()

  const [userId, setUserId] = useState(users[0].id)
  const [fullName, setFullName] = useState('')
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setFullName('')
      setPosition('')
      setNumber('')
      setUserId('')
      navigate('/dash/players')
    }
  }, [isSuccess, navigate])

  const onFullNameChanged = e => setFullName(e.target.value)
  const onPositionChanged = e => setPosition(e.target.value)
  const onNumberChanged = e => setNumber(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const canSave =
    [fullName, position, number, userId].every(Boolean) && !isLoading

  const onSavePlayerClicked = async e => {
    e.preventDefault()
    if (canSave) {
      console.log(
        'This comes from the form.....',
        userId,
        fullName,
        position,
        number
      )
      await addNewPlayer({ user: userId, fullName, position, number })
    }
  }

  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {' '}
        {user.username}
      </option>
    )
  })

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validFullNameClass = !fullName ? 'form__input--incomplete' : ''
  const validPositionClass = !position ? 'form__input--incomplete' : ''

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSavePlayerClicked}>
        <div className="form__title-row">
          <h2>New Player</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="fullName">
          Full Name:
        </label>
        <input
          className={`form__input ${validFullNameClass}`}
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="off"
          value={fullName}
          onChange={onFullNameChanged}
        />

        <label className="form__label" htmlFor="text">
          Position:
        </label>
        <input
          className={`form__input form__input--text ${validPositionClass}`}
          id="position"
          name="position"
          value={position}
          onChange={onPositionChanged}
        />

        <label className="form__label" htmlFor="number">
          Number:
        </label>
        <input
          className={`form__input form__input--text ${validPositionClass}`}
          id="number"
          name="number"
          value={number}
          onChange={onNumberChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewPlayerForm
