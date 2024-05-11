import { configureStore } from '@reduxjs/toolkit';
import fieldsSlice from '@/components/ticket/fieldsSlice';
import wonStatusSlice from "@/components/ticket/wonTicketSlice.js"

export default configureStore({
  reducer: {
    fields: fieldsSlice,
    wonStatus: wonStatusSlice
  },
});
