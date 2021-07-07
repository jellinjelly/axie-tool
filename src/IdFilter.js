import {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {Input, Button, Grid} from '@material-ui/core'
import {ALL_AXIES, ONE_AXIE} from './query'
import AxieCard from './AxieCard'

const IdFilter = (props) => {
  const {setFilteredData} = props
  const [axieId, setAxieId] = useState(0)
  const [getAxies, {data: dataById}] = useLazyQuery(ONE_AXIE)

  function handleChange(e) {
    setAxieId(e.target.value)
  }

  function handleEnterClick() {
    getAxies({
      variables: {
        axieId: axieId,
      }
    })
  }

  useEffect(() => {
    if(dataById && dataById.axie) {
      setFilteredData([dataById.axie])
    }
  }, [dataById, setFilteredData])

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}></Grid>
      <Grid item xs={4}>
        <Input autoFocus placeholder="Axie ID" onChange={handleChange}/>
        <Button variant="contained" onClick={handleEnterClick}>Enter</Button>
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        {dataById && dataById.axie ? <AxieCard axie={dataById.axie}/> : ""}
      </Grid>
    </Grid>
  )
}

export default IdFilter
