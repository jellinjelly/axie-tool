import {Modal, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const AxieDescModal = (props) => {
  const {showModal, setShowModal, selectedAxieDes, dataById} = props
  const classes = useStyles()

  function handleClose() {
    setShowModal(false)
  }

  let parts = selectedAxieDes.parts.map(part => {
    return part.name
  })

  function showParts(id){
    return parts[id]
  }

  return (
    <Modal open={showModal} onClose={handleClose}>
      <Grid container className={classes.paper}>
        <Grid item xs={5}>
          <img src={selectedAxieDes.image} alt={`${selectedAxieDes.class} axie`} />
        </Grid>
        <Grid item xs={7}>
          <h3>{`#${selectedAxieDes.id}`}</h3>
          <h4>{`Breed Count: ${selectedAxieDes.breedCount}`}</h4>
          <Grid container>
            <Grid item xs={12}>
              <h3>Parts: </h3>
            </Grid>
            <Grid item xs={4}>
              <p>{showParts(0)}</p>
              <p>{showParts(1)}</p>
            </Grid>
            <Grid item xs={4}>
              <p>{showParts(2)}</p>
              <p>{showParts(3)}</p>
            </Grid>
            <Grid item xs={4}>
              <p>{showParts(4)}</p>
              <p>{showParts(5)}</p>
            </Grid>
          </Grid>
          {dataById ? <Grid container>
            <Grid item>
              <h3>Stats: </h3>
              <p>{`Health: ${dataById.axie.stats.hp}`}</p>
              <p>{`Speed: ${dataById.axie.stats.speed}`}</p>
              <p>{`Skill: ${dataById.axie.stats.skill}`}</p>
              <p>{`Morale: ${dataById.axie.stats.morale}`}</p>
            </Grid>
          </Grid> : <></>}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AxieDescModal