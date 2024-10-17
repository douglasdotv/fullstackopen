import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import Input from './Input'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterText = event.target.value
    dispatch(setFilter(filterText))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      Filter:{' '}
      <Input
        name="filter"
        placeholder="Type to filter..."
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter
