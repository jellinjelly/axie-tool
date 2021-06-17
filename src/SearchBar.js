import {Fragment} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import {tempData} from './data'

const SearchBar = (props) => {
  const {parts, setParts} = props
  function handleChange(e, value) {
    if(value) {
      if(parts && !parts.includes(value)) {
        setParts([value, ...parts])
      }
      if(!parts) {
        setParts([value])
      }
    }
  }

  return (
    <Autocomplete
      autoHighlight
      options={tempData}
      onChange={handleChange}
      renderOption={(option) => (
        <Fragment>
          {option}
        </Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search parts and abilities"
          variant="outlined"
          inputProps={{
            ...params.inputProps
          }}

      />
      )}
    />
  )
}

export default SearchBar