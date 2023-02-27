import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  lists: {
    backgroundColor: theme.palette.background.paper
  }
})

const EntityResults = ({hits, classes}) => (
  <div className={classes.root}>
    <Typography variant="subtitle1" className={classes.filterTitle}>{hits.total ? hits.total.value : 0} records found</Typography>
    <Divider/>
    <List>
      { hits.hits.map((hit, i) => (
        <Result key={i.toString()}
          classes={classes}
          result={hit._source}/>
      ))}
    </List>
  </div>
)

const Result = ({result, classes}) => {  
  const {name, summary, slug} = result;
 return (
    <li>
      <ListItem component={Link} to={`/wiki/#${slug}`}>
        <ListItemText primary={name} secondary={summary}/>
      </ListItem>
      <Divider light/>
    </li>
  )
}

export default withStyles(styles)(EntityResults)
