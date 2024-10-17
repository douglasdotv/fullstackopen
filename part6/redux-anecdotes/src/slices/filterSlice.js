import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSet(_state, action) {
      const filterText = action.payload
      return filterText
    },
  },
})

export const { filterSet } = filterSlice.actions
export default filterSlice.reducer
