import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { isNull, isUndefined, isEmpty, keys, has } from "lodash";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

import SearchBox from "common/components/search/SearchBox";
import Facets from "common/components/search/Facets";

import Autosuggest from "../autosuggest/Autosuggest";
import DataSpaceResults from "./components/DataSpaceResults";
import { searchStyles } from "../../pages/HomePage";
import {
  updateEntityAndSource,
  submitSearch,
  paginateSearch,
} from "./dataSpaceActions";

import { DATASPACE_SOURCES } from "./dataSpaceConstants";

const styles = (theme) => {
  const pageStyle = {
    root: {
      paddingRight: theme.mixins.gutters().paddingRight * 1.5,
      paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
      paddingTop: 10,
      textAlign: "left",
    },
    entityLink: {
      paddingRight: theme.mixins.gutters().paddingRight,
      paddingLeft: theme.mixins.gutters().paddingLeft,
      paddingBottom: 20,
      textDecoration: "none",
    },
    divider: {
      marginRight: theme.mixins.gutters().paddingRight * 1.5,
      marginLeft: theme.mixins.gutters().paddingLeft * 1.5,
      marginTop: 2,
    },
    searchAreaWrapper: {
      // marginTop: '30px',
      marginTop: '-10px',
      paddingBottom: '20px !important'
    },
    autoCompleteResult: {
      marginTop: "-7px",
      margingLeft: "1px",
      position:  'absolute',
      zIndex:99
    },
  };
  const searchPageStyles = searchStyles(theme)
  return { ...searchPageStyles, ...pageStyle };
};

// const searchPageStyles = { ...searchStyles, ...styles };

class DataSpaceSearch extends Component {

  constructor(props){
    super(props)
    this.state = {inputValue: props.slug}
  }

  componentDidMount() {
    const { slug, term, source } = this.props;
    this.props.dispatch(updateEntityAndSource({ slug, source }));
  }

  handleFacetToggle(facet, selected) {
    const { q, filters, entity, source, slug } = this.props;
    filters[facet] = selected;
    this.props.dispatch(
      submitSearch({ q, filters, page: 0, entity, slug, source })
    );
  }

  onSearchInputChange = (newValue) => {
    this.setState({
      inputValue: newValue
    })
  };

  onSearchSubmit = (newValue) => {
    const { term, source } = this.props;
    this.onSearchInputChange(newValue)
    // this.props.dispatch(updateEntityAndSource({ slug: newValue, source }));
    window.location = `/dataspace/${source}?q=${newValue}&term=${newValue}`;
  };

  handlePageChange(event, newPage) {
    const { entity, filters, source, q, page, slug } = this.props;
    if (newPage != page) {
      this.props.dispatch(
        submitSearch({ q, filters, entity, slug, source, page: newPage })
      );
    }
  }

  render() {
    const {
      classes,
      entity,
      sourceConfig,
      filters,
      facets,
      results,
      page,
      slug,
      total_count
    } = this.props;
    const { category, name } = entity;
    const { columns, label, aggs, id } = sourceConfig;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={16}
      >
        <Grid
          container
          className={classes.searchAreaWrapper}
          justify="center"
          alignItems="center"
          item
        >
          <div className={classes.searchContainer}>
          <Autosuggest 
            value = {this.state.inputValue}
            onSearchInputChange = {this.onSearchInputChange}
            onSelectItem = {this.onSearchSubmit}
            onSubmit = {this.onSearchSubmit}
            source = {this.props.source}
            history = {this.props.history}
            placeholder = {"Search"}
            classes={classes} />
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          {facets && (
            <Facets
              aggs={aggs}
              facets={facets}
              selected={filters}
              handleFacetToggle={this.handleFacetToggle.bind(this)}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper elevation={1}>
            <DataSpaceResults
              index={id}
              hits={results}
              columns={columns}
              page={page || 0}
              handlePageChange={this.handlePageChange.bind(this)}
              linkCol="dc.identifier"
              label={label}
              slug={slug}
              total_count = {total_count}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ dataSpace, entity }, ownProps) => {
  const { source } = ownProps;
  const sourceConfig = DATASPACE_SOURCES[ownProps.source] || {};

  if (dataSpace.source !== ownProps.source) {
    return { source, entity, sourceConfig };
  }
  return { ...dataSpace, source, entity, sourceConfig };
};

export default withStyles(styles)(
  connect(mapStateToProps)(DataSpaceSearch)
);
