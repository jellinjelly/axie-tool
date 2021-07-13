import {Grid} from '@material-ui/core'
import AxieCard from './AxieCard'

const AxiesGrid = (props) => {
  const {data, saved, setSaved, handleOpenModal} = props

  return (
    <Grid container spacing={3}>
      {data.map(axie => {
        return (
          <Grid item key={axie.id} xs={12} sm={4} lg={3} onClick={(e) => {handleOpenModal(e, axie)}}>
            <AxieCard axie={axie} saved={saved} setSaved={setSaved}/>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default AxiesGrid