import {Radio, RadioGroup, FormControlLabel} from '@material-ui/core'

const RadioFilter = (props) => {
  const {count, setCount} = props
  const amount = ["Any", 1, 2, 3, 4, 5, 6]

  function handleSelectedValue(e) {
    if(e.target.value !== "Any") {
      setCount([parseInt(e.target.value)])
    } else {
      setCount(null)
    }
  }

  return (
    <RadioGroup row aria-label="rating" value={count === null ? 'Any' : count[0].toString()} onChange={handleSelectedValue}>
      {amount.map(num => {
        return (
          <FormControlLabel
          key={num}
          control={<Radio/>}
          value={num.toString()}
          label={num}
          labelPlacement="bottom"
        ></FormControlLabel>
        )
      })}
    </RadioGroup>
  )
}

export default RadioFilter;