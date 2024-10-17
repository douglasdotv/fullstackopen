const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filter/filterSet':
      const filterText = action.payload
      return filterText
    default:
      return state
  }
}

export const setFilter = (filterText) => {
  return {
    type: 'filter/filterSet',
    payload: filterText,
  }
}

export default filterReducer
