import { createSlice } from '@reduxjs/toolkit'
import { client } from "@/api/client.js"

//  status: 'idle' | 'loading' | 'succeeded' | 'failed',
//  error: string | null

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


export const fetchWonTicket = (amount) => {
  return async (dispatch) => {
    let counter = 2;
    let delay = 2000;
    dispatch(updateWonStatus({status: "loading"}));
    await fetcher(counter,delay,dispatch,amount);
  }
}

export async function fetcher(counter,delay,dispatch,amount, err = null)  {
  if(counter === 0) {
    dispatch(updateWonStatus({ status: "failed", error: err ? err : 'Ой, что-то пошло не так!' }));
    return
  }
  try {
    let response = await client.post("/api/check", { selectedNumber: { ...amount } })
    dispatch(updateWonTicket(response.data));
    dispatch(updateWonStatus({ status: "succeeded" }));
    counter = 0;
  } catch (err) {
    counter--;
    setTimeout(()=> fetcher(...arguments, err), delay);
  }
}

export default wonTicketSlice.reducer
