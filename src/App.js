import {useQuery, useLazyQuery} from '@apollo/client'
import {Grid, Button} from '@material-ui/core'
import {useState, useEffect} from 'react'
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {ALL_AXIES, ONE_AXIE} from './query'
import AxiesList from './AxiesList'
import AxiesGrid from './AxiesGrid'
import SavedList from './SavedList'
import Filter from './Filter'
import AxieDescModal from './AxieDescModal'
import './App.css';


function App() {
  const [isGridView, setIsGridView] = useState(true)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [saved, setSaved] = useState([])
  const [filterById, setFilterById] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedAxieDes, setSelectedAxiedDes] = useState({})

  const [getAxieById, {data: dataById}] = useLazyQuery(ONE_AXIE)

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

  function handleOpenModal(e, axie) {
    if(e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'svg') {
      setShowModal(!showModal)
      setSelectedAxiedDes(axie)
      //call api for that specific axie stats
      getAxieById({
        variables: {
          axieId: axie.id,
        }
      })
    }
  }

  if(axies.loading) {
    return <p>Loading...</p>
  }

  if(axies.error) {
    return <p>Error!</p>
  }

  return (
    <div className="App">
      {showModal ? <AxieDescModal setShowModal={setShowModal} showModal={showModal} selectedAxieDes={selectedAxieDes} dataById={dataById}/> : <></>}
      <Button variant="contained" onClick={() => {setFilterById(!filterById)}}>{filterById ? "All Filters" : "Filter By ID"}</Button>
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
          {isGridView ? <AxiesGrid data={filteredData} saved={saved} setSaved={setSaved} handleOpenModal={handleOpenModal}/> : <AxiesList data={filteredData} isAdd={true} saved={saved} setSaved={setSaved} handleOpenModal={handleOpenModal}/>
          }
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12}>
          <SavedList saved={saved} setSaved={setSaved} handleOpenModal={handleOpenModal}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
