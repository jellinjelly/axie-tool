import {Typography, Slider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: 400,
    margin: "0 auto"
  },
  label: {
    margin: '0 auto 35px'
  }
})

const SliderFilter = (props) => {
  const {breedCount, setBreedCount} = props;
  const classes = useStyles();

  function valueText(value) {
    return value
  }

  function handleChange(e, newVal) {
    setBreedCount(newVal)
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" className={classes.label} gutterBottom>Breed Count</Typography>
      <Slider
        onChange={handleChange}
        value={breedCount ? breedCount : [0, 7]}
        min={0}
        max={7}
        marks={true}
        color="secondary"
        valueLabelDisplay={"on"}
        aria-labelledby="range-slider"
        getAriaValueText={valueText}
      />
    </div>
  )
}

export default SliderFilter;