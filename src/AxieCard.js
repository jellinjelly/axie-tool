import {Grid, Paper} from '@material-ui/core'
import './axies-grid.css'

const AxieCard = (props) => {
  const {axie, saved, setSaved} = props

  function handleSaveClick(e, axie) {
    let found = false
    if(saved.length === 0) {
      setSaved([axie, ...saved])
    } else {
      saved.forEach((item, id, arr) => {
        if(item.id === axie.id) {
          found = true
        }
      })
      if(!found) {
        setSaved([axie, ...saved])
      }
    }
  }

  function showParts(axie, id) {
    if(axie.parts && axie.parts[0]) {
      return axie.parts[id].name
    }
    return ""
  }

  return (
    <Paper variant="outlined" elevation={3}>
      <Grid container className="id-bc-container">
        <Grid container>
          <Grid item xs={5}>
            <p>{`#${axie.id}`}</p>
          </Grid>
          <Grid item xs={5}>
            <p>{`Breed Count: ${axie.breedCount}`}</p>
            <p>{axie.class}</p>
          </Grid>
          <Grid item xs={1}>
            <button onClick={e => {handleSaveClick(e, axie)}}>save</button>
          </Grid>
        </Grid>
        <Grid container className="parts-container">
          <Grid item xs={4}>
            <p>{showParts(axie, 0)}</p>
            <p>{showParts(axie, 1)}</p>
          </Grid>
          <Grid item xs={4}>
            <p>{showParts(axie, 2)}</p>
            <p>{showParts(axie, 3)}</p>
          </Grid>
          <Grid item xs={4}>
            <p>{showParts(axie, 4)}</p>
            <p>{showParts(axie, 5)}</p>
          </Grid>
        </Grid>
      </Grid>
      <div className="grid-img-container">
        <img src={axie.image} alt="adult/egg axie"/>
      </div>
      <h3>{axie.auction && `$${axie.auction.currentPriceUSD}`}</h3>
    </Paper>
  )
}

export default AxieCard;