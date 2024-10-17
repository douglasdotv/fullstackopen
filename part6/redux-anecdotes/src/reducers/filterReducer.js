const initialState = ''

const filterReducer = (state = initialState, action) => {
  if (action.type === 'filter/filterSet') {
    const filterText = action.payload
    return filterText
  }
  return state
}

export const setFilter = (filterText) => {
  return {
    type: 'filter/filterSet',
    payload: filterText,
  }
}

export default filterReducer
