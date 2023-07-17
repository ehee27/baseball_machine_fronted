import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const playersAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.active === b.active ? 0 : a.active ? 1 : -1),
})

const initialState = playersAdapter.getInitialState()

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //------------------------------------------------------------- GET ALL PLAYERS
    getPlayers: builder.query({
      query: () => '/players',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },

      transformResponse: responseData => {
        const loadedPlayers = responseData.map(player => {
          player.id = player._id
          return player
        })
        return playersAdapter.setAll(initialState, loadedPlayers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Player', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Player', id })),
          ]
        } else return [{ type: 'Player', id: 'LIST' }]
      },
    }),
    //------------------------------------------------------------- CREATE PLAYER
    addNewPlayer: builder.mutation({
      query: initialPlayer => ({
        url: '/players',
        method: 'POST',
        body: {
          ...initialPlayer,
        },
      }),
      invalidatesTags: [{ type: 'Player', id: 'LIST' }],
    }),
    //------------------------------------------------------------- UPDATE PLAYER
    updatePlayer: builder.mutation({
      query: initialPlayer => ({
        url: '/players',
        method: 'PATCH',
        body: {
          ...initialPlayer,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Player', id: arg.id }],
    }),
    //------------------------------------------------------------- DELETE PLAYER
    deletePlayer: builder.mutation({
      query: ({ id }) => ({
        url: `/players`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Player', id: arg.id }],
    }),
  }),
})

export const {
  useGetPlayersQuery,
  useAddNewPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
} = playersApiSlice

// returns the query result object
export const selectPlayersResult = playersApiSlice.endpoints.getPlayers.select()

// creates memoized selector
const selectPlayersData = createSelector(
  selectPlayersResult,
  playersResult => playersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPlayers,
  selectById: selectPlayerById,
  selectIds: selectPlayerIds,
  // Pass in a selector that returns the players slice of state
} = playersAdapter.getSelectors(
  state => selectPlayersData(state) ?? initialState
)
