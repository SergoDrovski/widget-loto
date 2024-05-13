import { configureStore } from "@reduxjs/toolkit"
import fieldsSlice from "@/components/ticket/fieldsSlice"
import wonTicketSlice from "@/components/ticket/wonTicketSlice.js"

export default configureStore({
  reducer: {
    fields: fieldsSlice,
    wonTicket: wonTicketSlice,
  },
})
