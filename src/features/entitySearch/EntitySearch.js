import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { isArray, keys, has, isUndefined } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

import {submitSearch, paginateSearch} from './entitySearchActions';

import EntityResults from './components/EntityResults';

import SearchBox from 'common/components/search/SearchBox';
import Facets from 'common/components/search/Facets';
import Pagination from 'common/components/search/Pagination';

import {ENTITY_RESULTS_COLUMNS} from './entitySearchConstants';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

export class EntitySearch extends Component {

  componentDidMount() {
    const {q} = this.props;
    this.props.dispatch(submitSearch({q, ...this.props}));
  }
  
  handleQuery({target}) {
    const {filters} = this.props;
    this.props.dispatch(submitSearch({q: target.value, filters, page: 1}));
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const {filters} = this.props;
    const q = event.target.getElementsByTagName('input')[0].value; 
    this.props.history.push({pathname: '/search', search: `q=${q}` });
    this.props.dispatch(submitSearch({q, filters, page: 1}));
  }
 
  handlePagination() {
    const {filters, q} = this.props;
    const page = this.props.page + 1; 
    this.props.dispatch(paginateSearch({q, filters, page}));
  }

  handleFacetToggle(facet, selected) {
    const {q, filters} = this.props;
    filters[facet] = selected; 
    this.props.dispatch(submitSearch({q, filters, page: 1}));
  }

  render() {
    const { filters, facets, results, classes, q, reload} = this.props; 
    const  cols = ENTITY_RESULTS_COLUMNS;  
    
    if ( reload ) {
      this.props.dispatch(submitSearch({q, filters, page: 1}));
      return null;
    }
    else {
      return (
        <Grid container direction='row' justify='flex-start' alignItems='flex-start' spacing={16}>
          <Grid item xs={12} sm={3}  > 
            <Facets facets={facets} selected={filters} handleFacetToggle={this.handleFacetToggle.bind(this)} />          
          </Grid> 
          <Grid item xs={8} sm={9}> 
            <Paper className={classes.paper}>
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}> 
                 <SearchBox q={q} onSubmit={this.handleSubmit.bind(this)} context="entitySearch" /> 
              </AppBar>
              <div className={classes.contentWrapper}>
                <EntityResults hits={results} />  
                <Pagination handlePagination={this.handlePagination.bind(this)} />
              </div> 
            </Paper>
          </Grid> 
        </Grid>
      );
    }
  }
}

const mapStateToProps = ({entitySearch}, ownProps) => {
  if ( entitySearch.q !== ownProps.q ) {
    entitySearch.q = ownProps.q;
    entitySearch.reload = true; 
  } 
  return {...entitySearch};
}

export default withStyles(styles)(connect(mapStateToProps)(EntitySearch));
