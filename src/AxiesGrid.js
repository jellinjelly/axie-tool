import {Grid, Paper} from '@material-ui/core'
import './axies-grid.css'

const AxiesGrid = (props) => {
  const {data, saved, setSaved} = props

  function showParts(axie, id) {
    if(axie.parts && axie.parts[0]) {
      return axie.parts[id].name
    }
    return ""
  }

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

  return (
    <Grid container spacing={3}>
      {data.map(axie => {
        return (
          <Grid item key={axie.id} xs={12} sm={4} lg={3}onClick={e => {handleSaveClick(e, axie)}}>
            <Paper variant="outlined" elevation={3}>
              <Grid container className="id-bc-container">
                <Grid container>
                  <Grid item xs={6}>
                    <p>{`#${axie.id}`}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p>{`Breed Count: ${axie.breedCount}`}</p>
                    <p>{axie.class}</p>
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
          </Grid>
        )
      })}
    </Grid>
  )
}

export default AxiesGrid