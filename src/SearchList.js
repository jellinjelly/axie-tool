import {List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import DeleteIcon from '@material-ui/icons/Delete'

const SearchList = (props) => {
  const {parts, setParts} = props
  function handleDelete(e, part){
    let newParts = [...parts]
    newParts.forEach((item, i) => {
      if(item === part){
        newParts.splice(i, 1)
      }
    })
    setParts(newParts)
  }

  return (
    <List>
      {parts && parts.map(part => {
        return (
          <ListItem key={part}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={part}/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={(e) => handleDelete(e, part)}>
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default SearchList;