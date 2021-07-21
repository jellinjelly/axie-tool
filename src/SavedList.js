import AxiesList from "./AxiesList"
import {Grid} from '@material-ui/core'
import "./savedList.css"

const SavedList = (props) => {
  const {saved, setSaved, handleOpenModal} = props
  return (
    <Grid container className="saved-container">
      <Grid item>
        <h2>Saved Axies</h2>
      </Grid>
      <AxiesList data={saved} isAdd={false} setSaved={setSaved} handleOpenModal={handleOpenModal}/>
    </Grid>

  )
}

export default SavedList