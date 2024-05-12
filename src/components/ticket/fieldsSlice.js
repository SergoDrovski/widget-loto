import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  firstField: {
    status: false,
    numbers: [],
  },
  secondField: {
    status: false,
    numbers: [],
  },
}

export const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    addSelected(state, action) {
      const { fieldName, value } = action.payload
      const existingField = state[fieldName];
      if (existingField) {
        if(value.length) {
          existingField.numbers = value;
        } else {
          existingField.numbers.push(value);
        }
      }
    },
    deleteSelected(state, action) {
      const { fieldName, value } = action.payload
      const existingField = state[fieldName];
      if (existingField) {
        state[fieldName].numbers = existingField.numbers.filter((num)=> num !== value );
      }
    },
    clearAllSelected() {
      return initialState;
    },
    updateStatus(state, action) {
      const { fieldName, status } = action.payload
      state[fieldName].status = status;
    }
  },
})

export const { addSelected, deleteSelected,updateStatus,clearAllSelected } = fieldsSlice.actions

export const selectFieldsNumbers = (state) => {
  const selectedNumber = {};
  Object.entries(state.fields).forEach(field => {
    let nameField = field[0];
    selectedNumber[nameField] = field[1].numbers;
  })
  return selectedNumber;
}

export const selectFinalStatus = (state) => {
  const {firstField, secondField} = state.fields;
  return firstField.status && secondField.status;
}

export default fieldsSlice.reducer
