import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: { 
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
  },
  message: { width: '100%' }
})

const NoSearchResults = ({classes}) => (
  <ListItem alignItems="center" justify="center" classes={{...classes}}>
       <Typography variant="h5" gutterBottom align="center" classes={{root: classes.message}}>
          No Results Found
       </Typography>
  </ListItem>
)


export default withStyles(styles)(NoSearchResults)
