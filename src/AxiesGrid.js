import {Grid} from '@material-ui/core'
import AxieCard from './AxieCard'

const AxiesGrid = (props) => {
  const {data, saved, setSaved} = props

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
            <AxieCard axie={axie}/>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default AxiesGrid