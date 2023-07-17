import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    // setting creds as we login
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    // setting auth (token) to null
    logOut: (state, action) => {
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = state => state.auth.token
