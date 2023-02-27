import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import RefreshIcon from '@material-ui/icons/Refresh'

const styles = theme => ({
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  submitBtn: {
    marginRight: theme.spacing.unit
  },
  contentWrapper: {
    margin: '40px 16px'
  }
})

export class SearchBox extends Component {

  constructor(props) {
    super(props) 
    const {q} = this.props;
    this.state = { q }; 
  }

  onChange({target}) {
    const q = this.state;
    const {value} = target;
    if (q != value) {
      this.setState({q:value}); 
    }
  }

 render() { 
   const { classes, onSubmit } = this.props;
   const { q } = this.state; 
   return (
      <form onSubmit={onSubmit}>
        <Toolbar>
          <Grid container spacing={16} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit"/>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder='Search'
                value={q}
                onChange={this.onChange.bind(this)}
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            { false && <Grid item>
              <Button variant="contained" color="primary" className={classes.submitBtn}>
                Submit
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit"/>
                </IconButton>
              </Tooltip>
            </Grid> }
          </Grid>
        </Toolbar>
      </form>
  )
  }
}

export default withStyles(styles)(SearchBox)
