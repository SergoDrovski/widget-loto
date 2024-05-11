import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstField: [],
  secondField: []
}

//{fieldName: "firstField", value: []}

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addSelected(state, action) {
      const { fieldName, value } = action.payload
      const existingField = state[fieldName];
      if (existingField) {
        existingField.push(value);
      }
    },
    deleteSelected(state, action) {
      const { fieldName, value } = action.payload
      const existingField = state[fieldName];
      if (existingField) {
        state[fieldName] = existingField.filter((num)=> num !== value );
      }
    },
  },
})

export const { addSelected, deleteSelected } = fieldsSlice.actions

export default fieldsSlice.reducer
