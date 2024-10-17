import { useDispatch } from 'react-redux'
import { filterSet } from '../slices/filterSlice'
import Input from './Input'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterText = event.target.value
    dispatch(filterSet(filterText))
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
