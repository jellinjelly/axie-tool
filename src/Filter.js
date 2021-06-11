import {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, Grid} from '@material-ui/core'
import ALL_AXIES from './query'
import RadioFilter from './RadioFilter'
import './filter.css'

const Filter = (props) => {
  const [checked, setChecked] = useState({
    Beast: false,
    Plant: false,
    Bug: false,
    Mech: false,
    Dusk: false,
    Aquatic: false,
    Bird: false,
    Reptile: false,
    Dawn: false
  })
  const [axieClass, setAxieClass] = useState(null)
  const [breedCount, setBreedCount] = useState(null)
  const [mystic, setMystic] = useState(null)
  const [pureness, setPureness] = useState(null)
  const [getAxies, {loading, data: filteredData}] = useLazyQuery(ALL_AXIES)
  const {data, setFilteredData} = props

  function handleCheckBoxClick(e) {
    setChecked({...checked, [e.target.name]: e.target.checked})
  }

  function handleSubmitClick(e){
    e.preventDefault()
    let selected = []
    for(let species in checked) {
      if(checked[species] === true) {
        selected.push(species)
      }
    }

    setAxieClass(selected)
    getAxies({
      variables: {
        from: 0,
        size: 24,
        sort: "Latest",
        owner: null,
        auctionType: 'Sale',
        criteria: {
          "region": null,
          "parts": null,
          "bodyShapes": null,
          "classes": selected,
          "stages": null,
          "numMystic": mystic,
          "pureness": pureness,
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

  let species = []
  let species2 = []
  for(let key in checked) {
    if(species.length < 5) {
      species.push(key)
    } else {
      species2.push(key)
    }
  }

  useEffect(() => {
    if(filteredData && filteredData.axies.results) {
      let newData = []
      filteredData.axies.results.forEach(axie => {
        if(axieClass.includes(axie.class)) {
          newData.push(axie)
        }
      })
      if(newData.length > 0) {
        setFilteredData(newData)
      } else {
        setFilteredData(filteredData.axies.results)
      }
    }
  }, [filteredData, setFilteredData, axieClass, data])

  return (
    <div className="form-container">
      <Grid container>
        <Grid item sm={12} md={3}>
          <FormControl>
            <FormGroup>
              {species.map((specie, idx) => {
                return (
                  <FormControlLabel
                  key={specie + idx} control={<Checkbox checked={checked[specie]} onChange={handleCheckBoxClick} name={specie} /> }
                    label={specie}
                  />
                )
              })}
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup>
              {species2.map((specie, idx) => {
                return (
                  <FormControlLabel
                    key={specie + idx} control={<Checkbox checked={checked[specie]} onChange={handleCheckBoxClick} name={specie}  /> }
                    label={specie}
                  />
                )
              })}
            </FormGroup>
          </FormControl>

        </Grid>
        <Grid item sm={12} md={8}>
          <FormControl>
            <FormLabel>Mystic</FormLabel>
            <RadioFilter count={mystic} setCount={setMystic}/>
          </FormControl>
          <FormControl>
            <FormLabel>Pureness</FormLabel>
            <RadioFilter count={pureness} setCount={setPureness}/>
          </FormControl>
        </Grid>
        <Grid item md={1}>
          <Button variant="contained" type="submit" onClick={handleSubmitClick}>Submit</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Filter;