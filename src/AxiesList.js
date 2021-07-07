import {Grid, List, ListItem, ListItemText} from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import './axies-list.css'

const AxiesList = (props) => {
  const {data, isAdd, saved, setSaved} = props

  function showParts(axie, id) {
    if(axie.parts[0]) {
      return axie.parts[id].name
    }
    return ""
  }

  function handleSaveClick(e, axie){
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

  function handleDeleteClick(e, axie){
    data.forEach((item, id, arr) => {
      if(item.id === axie.id){
        arr.splice(id, 1)
      }
    })
    setSaved([...data])
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <List dense={false}>
          {data && data.map(axie => {
              return (
                <ListItem className="axie-container" key={axie.id} onClick={isAdd ? e => {handleSaveClick(e, axie)} : e => ""}>
                  <Grid item xs={2} >
                    <div className="img-container">
                      <img src={axie.image} alt="adult/egg axie"/>
                    </div>
                  </Grid>
                  <Grid item xs={2} >
                    <ListItemText primary={`Axie #${axie.id}`} />
                    <ListItemText primary={`Breed Count: ${axie.breedCount}`} />
                  </Grid>
                  <Grid item xs={2} >
                    <ListItemText primary={showParts(axie, 0)}/>
                    <ListItemText primary={showParts(axie, 1)}/>
                  </Grid>
                  <Grid item xs={2} >
                    <ListItemText primary={showParts(axie, 2)}/>
                    <ListItemText primary={showParts(axie, 3)}/>
                  </Grid>
                  <Grid item xs={2} >
                    <ListItemText primary={showParts(axie, 4)}/>
                    <ListItemText primary={showParts(axie, 5)}/>
                  </Grid>
                  <Grid item xs={2} >
                    <ListItemText primary={axie.auction ? `$${axie.auction.currentPriceUSD}` : '-'} />
                  </Grid>
                  {!isAdd && <DeleteOutlinedIcon onClick={e => {handleDeleteClick(e, axie)}}/> }
                </ListItem>
              )
          })}
        </List>
      </Grid>
    </Grid>
  )
}

export default AxiesList;