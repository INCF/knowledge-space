import React, {Component} from "react";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import {isEmpty} from 'lodash'
import keycode from 'keycode';
import EventListener from 'react-event-listener';


const styles = theme => ({
   
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginBottom: '20px' 
  }, 
  paper: { 
    color: theme.palette.text.secondary, 
   },
 
  gridItem: {
    padding: theme.spacing.unit * 2,
    width: '100%',  
    marginLeft: '0', 
  },  
  filterTitle: { 
    textTransform: 'uppercase', 
    color: theme.palette.secondary.dark 
  },
  filtersTitle: {
    backgroundColor: theme.palette.dark.light,
    color: '#fff',
    textTransform: 'uppercase' 
  },
  filter: { 
    padding: '0' 
   },
  filterItem: {
    padding: '0',
    textTransform: 'capitalize'
  },
  textField: {
    width: '90%'
  },
});

class KeywordSearch extends Component {

  state = {
    keyword: '',
  };

  handleChange = event => {
    const {handleKeywordSearch} = this.props;
    const {keyword} = this.state;
    const {value} = event.target;
    
    this.setState({ keyword: value});
  };

  triggerSearch() {
    const {keyword} = this.state;
    this.props.handleKeywordSearch(keyword);
  } 
  
  handleKeyDown = event => {
   if ( 
       keycode(event) == 'enter' && 
       document.activeElement === this.inputRef &&
       !isEmpty(event.target.value)
      ) { 
        this.triggerSearch(); 
      }
  };

  render() {
     const { classes } = this.props;
     const triggerSearch = this.triggerSearch.bind(this);

    return(
  <Grid container alignItems="flex-start" direction="column" justify="flex-start" spacing={16}>
    <EventListener target="window" onKeyDown={this.handleKeyDown.bind(this)} />
    <Grid item className={classes.gridItem} > 
      <Paper className={classes.filtersTitle} >
        <Typography variant='h6' color='inherit' >Search</Typography>
      </Paper>
    </Grid>
    <Grid item className={classes.gridItem} > 
      <Paper >
        <TextField
          id="outlined-name"
          label="Keyword"
          className={classes.textField}
          value={this.state.keyword}
          onChange={this.handleChange.bind(this)}
          margin="normal"
          variant="outlined"
          inputRef={ref => {
            this.inputRef = ref;
          }}
          InputProps={{
          endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  aria-label="Toggle password visibility"
                  onClick={triggerSearch}
                />
              </InputAdornment>
            ),
        }}  
        />
      </Paper>
    </Grid>
  </Grid>
    )
  }
};

  
export default withStyles(styles)(KeywordSearch);
