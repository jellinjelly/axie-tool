import {useQuery} from '@apollo/client'
import {Grid, Button} from '@material-ui/core'
import {useState, useEffect} from 'react'
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {ALL_AXIES} from './query'
import AxiesList from './AxiesList'
import AxiesGrid from './AxiesGrid'
import SavedList from './SavedList'
import Filter from './Filter'
import './App.css';


function App() {
  const [isGridView, setIsGridView] = useState(true)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [saved, setSaved] = useState([])
  const [filterById, setFilterById] = useState(false)

  const axies = useQuery(ALL_AXIES, {
    variables: {
      from: 0,
      size: 24,
      sort: "Latest"
    }
  })

  useEffect(() => {
    if(axies.data && axies.data.axies) {
      setData(axies.data.axies.results)
      setFilteredData(axies.data.axies.results)
    }
  }, [axies.data])

  function setLayoutClick(e, value){
    if(value !== null) {
      setIsGridView(value)
    }
  }

  if(axies.loading) {
    return <p>Loading...</p>
  }

  if(axies.error) {
    return <p>Error!</p>
  }

  console.log(filteredData)

  return (
    <div className="App">
      <Button variant="contained" onClick={() => {setFilterById(!filterById)}}>Filter By ID</Button>
      <Filter data={data} setFilteredData={setFilteredData} filterById={filterById}/>
      <ToggleButtonGroup value={isGridView} exclusive onChange={setLayoutClick} className="toggleButtons">
        <ToggleButton value={true}>
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value={false}>
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Grid container>
        <Grid item md={12}>
          {isGridView ? <AxiesGrid data={filteredData} saved={saved} setSaved={setSaved}/> : <AxiesList data={filteredData} isAdd={true} saved={saved} setSaved={setSaved}/>
          }
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <SavedList saved={saved} setSaved={setSaved}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
