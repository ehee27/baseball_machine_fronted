import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewPlayerForm from './NewPlayerForm'

const NewPlayer = () => {
  const users = useSelector(selectAllUsers)

  const content = users ? <NewPlayerForm users={users} /> : <p>Loading...</p>

  return content
}
export default NewPlayer

// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAddNewPlayerMutation } from './playersApiSlice'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSave } from '@fortawesome/free-solid-svg-icons'

// const NewPlayerForm = ({ users }) => {
//   const [addNewPlayer, { isLoading, isSuccess, isError, error }] =
//     useAddNewPlayerMutation()

//   const navigate = useNavigate()

//   const [title, setTitle] = useState('')
//   const [text, setText] = useState('')
//   const [userId, setUserId] = useState(users[0].id)

//   useEffect(() => {
//     if (isSuccess) {
//       setTitle('')
//       setText('')
//       setUserId('')
//       navigate('/dash/players')
//     }
//   }, [isSuccess, navigate])

//   const onTitleChanged = e => setTitle(e.target.value)
//   const onTextChanged = e => setText(e.target.value)
//   const onUserIdChanged = e => setUserId(e.target.value)

//   const canSave = [title, text, userId].every(Boolean) && !isLoading

//   const onSavePlayerClicked = async e => {
//     e.preventDefault()
//     if (canSave) {
//       await addNewPlayer({ user: userId, title, text })
//     }
//   }

//   const options = users.map(user => {
//     return (
//       <option key={user.id} value={user.id}>
//         {' '}
//         {user.username}
//       </option>
//     )
//   })

//   const errClass = isError ? 'errmsg' : 'offscreen'
//   const validTitleClass = !title ? 'form__input--incomplete' : ''
//   const validTextClass = !text ? 'form__input--incomplete' : ''

//   const content = (
//     <>
//       <p className={errClass}>{error?.data?.message}</p>

//       <form className="form" onSubmit={onSavePlayerClicked}>
//         <div className="form__title-row">
//           <h2>New Player</h2>
//           <div className="form__action-buttons">
//             <button className="icon-button" title="Save" disabled={!canSave}>
//               <FontAwesomeIcon icon={faSave} />
//             </button>
//           </div>
//         </div>
//         <label className="form__label" htmlFor="title">
//           Title:
//         </label>
//         <input
//           className={`form__input ${validTitleClass}`}
//           id="title"
//           name="title"
//           type="text"
//           autoComplete="off"
//           value={title}
//           onChange={onTitleChanged}
//         />

//         <label className="form__label" htmlFor="text">
//           Text:
//         </label>
//         <textarea
//           className={`form__input form__input--text ${validTextClass}`}
//           id="text"
//           name="text"
//           value={text}
//           onChange={onTextChanged}
//         />

//         <label
//           className="form__label form__checkbox-container"
//           htmlFor="username"
//         >
//           ASSIGNED TO:
//         </label>
//         <select
//           id="username"
//           name="username"
//           className="form__select"
//           value={userId}
//           onChange={onUserIdChanged}
//         >
//           {options}
//         </select>
//       </form>
//     </>
//   )

//   return content
// }

// export default NewPlayerForm
