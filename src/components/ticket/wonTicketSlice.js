import { createSlice } from '@reduxjs/toolkit'
// import { client } from "@/api/client.js"

// {
//   status: 'idle' | 'loading' | 'succeeded' | 'failed',
//   error: string | null
// }

const initialState = {
  selectedNumber: {
    firstField: [],
    secondField: []
  },
  isTicketWon: false,
  status: 'idle',
  error: null
}


export const wonTicketSlice = createSlice({
  name: 'wonTicket',
  initialState,
  reducers: {
    updateWonTicket(state, action) {
      return action.payload
    },
    clearWonTicket() {
      return initialState;
    },
    updateWonStatus(state, action) {
      const { status, error } = action.payload
      state.status = status;
      if(error) state.error = error;
    }
  }
})
export const {
  updateWonTicket,
  updateWonStatus,
  clearWonTicket
} = wonTicketSlice.actions

// export const fetchWonTicket = (amount) => {
//   return (dispatch) => {
//     dispatch(updateWonStatus({status: "loading"}))
//     client.post("/api/check", {
//       selectedNumber: { ...amount }
//     }).then(response => {
//       dispatch(updateWonTicket(response.data))
//       dispatch(updateWonStatus({status: "succeeded"}))
//     }).catch(err => {
//       dispatch(updateWonStatus({status: "failed", error: err}))
//     })
//   }
// }

export default wonTicketSlice.reducer
