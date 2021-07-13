import {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {Input, Button, Grid} from '@material-ui/core'
import {ALL_AXIES, ONE_AXIE} from './query'
import AxieCard from './AxieCard'

const IdFilter = (props) => {
  const {setFilteredData} = props
  const [axieId, setAxieId] = useState(0)
  const [getAxieById, {data: dataById}] = useLazyQuery(ONE_AXIE)
  const [getAxies, {data: similarAxies}] = useLazyQuery(ALL_AXIES)

  function handleChange(e) {
    setAxieId(e.target.value)
  }

  function handleEnterClick() {
    getAxieById({
      variables: {
        axieId: axieId,
      }
    })
  }

  useEffect(() => {
    if(dataById && dataById.axie) {
      let parts = dataById.axie.parts.map(part => {
        return part.id
      })
      let axieClass = [dataById.axie.class]
      getAxies({
        variables: {
          from: 0,
          size: 24,
          sort: "Latest",
          owner: null,
          auctionType: 'Sale',
          criteria: {
            "region": null,
            "parts": parts,
            "bodyShapes": null,
            "classes": axieClass,
            "stages": null,
            "numMystic": null,
            "pureness": null,
            "title": null,
            "breedable": null,
            "breedCount": null,
            "hp": [],
            "skill": [],
            "speed": [],
            "morale": []
          }
        }
      })
    }
    if(similarAxies && similarAxies.axies.results) {
      setFilteredData(similarAxies.axies.results)
    }
  }, [dataById, setFilteredData, similarAxies, getAxies])

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
