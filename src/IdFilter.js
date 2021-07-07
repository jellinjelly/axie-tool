import {useState, useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {ALL_AXIES, ONE_AXIE} from './query'
import {Input, Button} from '@material-ui/core'

const IdFilter = (props) => {
  const {data, setFilteredData, filterById} = props
  // const [input, setInput] = useState(0)
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
    <>
      <Input autoFocus placeholder="Axie ID" onChange={handleChange}/>
      <Button variant="contained" onClick={handleEnterClick}>Enter</Button>
    </>
  )
}

export default IdFilter
