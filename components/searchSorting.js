import { Select } from '@chakra-ui/select'

const regions = [
  { id: 1, name: 'Africa' },
  { id: 2, name: 'Americas' },
  { id: 3, name: 'Asia' },
  { id: 4, name: 'Europe' },
  { id: 5, name: 'Oceania' }
]

const SearchSorting = ({ handleSortingChange }) => {
  const handleChange = (e) => {
    handleSortingChange(e.target.value)
  }
  return (
    <Select placeholder="Filter by Region" onChange={handleChange}>
      {regions.map((item) => (
        <option key={item.id} value={item.name.toLowerCase()}>
          {item.name}
        </option>
      ))}
    </Select>
  )
}

export default SearchSorting
