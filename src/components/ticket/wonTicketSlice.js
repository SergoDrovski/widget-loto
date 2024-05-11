import { createSlice } from '@reduxjs/toolkit'
import { client } from "@/api/client.js"

const initialState = {
  selectedNumber: {
    firstField: [],
    secondField: []
  },
  isTicketWon: false
}


export const wonStatusSlice = createSlice({
  name: 'wonStatus',
  initialState,
  reducers: {
    updateWonStatus(state, action) {
      return action.payload
    }
  }
})
export const { updateWonStatus } = wonStatusSlice.actions
export const fetchWonStatus = (amount) => {
  return async (dispatch) => {
    try {
      const response = await client.post('/api/check',{
        selectedNumber: {...amount}
      })
      dispatch(updateWonStatus(response.data));
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}

export default wonStatusSlice.reducer
