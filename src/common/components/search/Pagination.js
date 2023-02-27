import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

const Pagination = ({handlePagination, classes}) => (
  <div>
    <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handlePagination}>
      <ExpandMoreIcon/>
    </Fab>
  </div>
)

export default withStyles(styles)(Pagination)
