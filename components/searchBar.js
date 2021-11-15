import { SearchIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { useState } from 'react'

const SearchBar = ({ handleSearchChange, val }) => {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    handleSearchChange(e.target.value)
    setQuery(e.target.value)
  }
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="Search for a country"
        onChange={handleChange}
        value={query || val}
      />
    </InputGroup>
  )
}

export default SearchBar
