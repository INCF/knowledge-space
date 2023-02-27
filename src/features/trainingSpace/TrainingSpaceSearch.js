import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { isArray, keys, isEmpty, has } from "lodash";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";

import SearchBox from "common/components/search/SearchBox";
import Facets from "common/components/search/Facets";
import KeywordSearch from "common/components/search/KeywordSearch";
import TablePagination from "@material-ui/core/TablePagination";
import Pagination from "common/components/search/Pagination";
import NoSearchResults from "common/components/search/NoSearchResults";
import Detail from "../entity/components/Detail";
import { updateSlug } from "../entity/entityActions";
import TrainingSpaceResult from "./components/TrainingSpaceResult";
import { submitSearch, paginateSearch } from "./trainingSpaceActions";

const styles = (theme) => ({
  root: {
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
    paddingTop: 10,
    textAlign: "left",
    verticalAlign: "bottom",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
  },
  entityLink: {
    paddingRight: theme.mixins.gutters().paddingRight,
    paddingLeft: theme.mixins.gutters().paddingLeft,
    paddingBottom: 10,
    textDecoration: "none",
  },
  divider: {
    marginRight: theme.mixins.gutters().paddingRight * 1.5,
    marginLeft: theme.mixins.gutters().paddingLeft * 1.5,
    marginTop: 2,
  },
  total: {
    marginLeft: "auto",
  },
  resultsBox: {
    minHeight: 250,
  },
  resultsList: {},
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class TrainingSpaceSearch extends Component {
  componentDidMount() {
    const { slug } = this.props;
    console.debug("Slug on publication is" + slug);
    if (this.props.fromSearch) {
      this.props.dispatch(submitSearch({ q: slug }));
    } else {
      this.props.dispatch(updateSlug(slug));
    }
  }

  componentDidUpdate(prev) {
    const { slug } = this.props;
    if (prev.slug !== slug) {
      console.debug("Slug on publication is" + slug);
      if (this.props.fromSearch) {
        this.props.dispatch(submitSearch({ q: slug }));
      } else {
        this.props.dispatch(updateSlug(slug));
      }
    }
  }

  handlePagination() {
    const { entity, filters, q } = this.props;
    const { curie_paths } = entity;
    const page = this.props.page + 1;
    this.props.dispatch(paginateSearch({ q, curie_paths, filters, page }));
  }

  handlePageChange(event, newPage) {
    const { entity, filters, source, q, page, slug } = this.props;
    if (newPage != page) {
      this.props.dispatch(
        submitSearch({ q, filters, entity, slug, source, page: newPage })
      );
    }
  }


  handleFacetToggle(facet, values) {
    const { filters, slug, entity } = this.props;
    const { curie_paths } = entity;
    filters[facet] = values;
    this.props.dispatch(submitSearch({ q: slug, filters, curie_paths }));
  }

  handleKeywordSearch(value) {
    if (value.length > 0 && value.length < 3) {
      return;
    }
    const { filters, entity } = this.props;
    const { curie_paths } = entity;
    const q = value;
    this.props.dispatch(submitSearch({ q, filters, curie_paths }));
  }

  render() {
    const {
      results,
      entity,
      filters,
      facets,
      classes,
      page,
      showProgress,
      slug,
    } = this.props;
    const { name } = entity;

    const { hits } = results;
    const total = results.total ? results.total.value : 0
    const showTotal = total > 0 && !showProgress;
    const showNoResults = !showProgress && total == 0;
    const showPagination = page * 25 < total && showTotal && !showProgress;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={16}
      >
        <Grid item xs={12} sm={3}>
          {!this.props.fromSearch && (
            <KeywordSearch
              handleKeywordSearch={this.handleKeywordSearch.bind(this)}
            />
          )}
          <Facets
            facets={facets}
            selected={filters}
            handleFacetToggle={this.handleFacetToggle.bind(this)}
          />
        </Grid>
        <Grid item xs={12} sm={9} classes={{}}>
           <div variant="subtitle1" className={classes.heading}>
              <Typography variant="h4"> 
                Training Results: {slug}
              </Typography>
              <div className={classes.total}>{total} records found</div>
            </div>
            <Divider classes={{ root: classes.divider }} />
            <List classes={{ container: classes.resultsList }}>
              {showProgress && (
                <CircularProgress
                  size={80}
                  thickness={7}
                  classes={{ root: classes.progress }}
                />
              )}
              {!showProgress &&
                hits.map((hit) => (
                  <TrainingSpaceResult
                    key={hit._id}
                    disableGutters={false}
                    result={hit._source}
                  />
                ))}
              {showNoResults && <NoSearchResults />}
            </List>
            {showPagination && (
              <Pagination handlePagination={this.handlePagination.bind(this)} />
            )}
          {/* <TablePagination
            rowsPerPageOptions={[25]}
            component="div"
            count={total}
            rowsPerPage={25}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handlePageChange.bind(this)}
            onChangeRowsPerPage={() => {}}
          /> */}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ trainingSpace, entity }, ownProps) => {
  return { ...trainingSpace, ...ownProps, entity, loaded: true };
};

export default withStyles(styles)(connect(mapStateToProps)(TrainingSpaceSearch));
