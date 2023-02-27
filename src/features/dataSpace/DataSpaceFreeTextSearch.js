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
import FacetLinks from "common/components/search/FacetLinks";
import Pagination from "common/components/search/Pagination";
import DataSpaceFreeTextResults from "./components/DataSpaceFreeTextResults";
import {
  updateEntityAndSource,
  submitSearch,
  paginateSearch,
  updateDataByFreeTextDataSearch,
  submitFreeTextSearch,
} from "./dataSpaceActions";

import { DATASPACE_SOURCES } from "./dataSpaceConstants";

const styles = (theme) => ({
  root: {
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
    paddingTop: 10,
    textAlign: "left",
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
});

class DataSpaceFreeTextSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facets: {},
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    this.props.dispatch(updateDataByFreeTextDataSearch({ slug }));
  }

  componentDidUpdate(prev) {
    const { slug, facets, filters } = this.props;
    if (prev.slug !== slug) {
      this.props.dispatch(updateDataByFreeTextDataSearch({ slug }));
    }
    // else if (!filters || !filters["sources"]) {
    //   this.setState({
    //     facets,
    //   });
    // }
  }

  handleFacetToggle(facet, selected) {
    const { slug, filters, facets } = this.props;
    filters[facet] = selected;
    this.props.dispatch(
      updateDataByFreeTextDataSearch({ slug, filters, facets })
    );
  }

  handlePageChange(event, newPage) {
    const { entity, filters, source, facets, slug, page } = this.props;
    if (newPage != page) {
      this.props.dispatch(
        submitFreeTextSearch({
          slug,
          filters,
          entity,
          source,
          facets,
          page: newPage,
        })
      );
    }
  }

  render() {
    const {slug, classes, entity, filters, facets, results, page, total_count } = this.props;
    if(!facets || !slug || !results ) {
      return null
    }
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={16}
      >
        <Grid item xs={12} sm={3}>
          <FacetLinks
            facets={facets}
            selected={filters}
            handleFacetToggle={this.handleFacetToggle.bind(this)}
            slug={this.props.slug}
          />
        </Grid>
        <Grid item item xs={12} sm={9} classes={{}}>
          <DataSpaceFreeTextResults
            slug={this.props.slug}
            index={"scr*"}
            hits={results}
            columns={{ "dc.title": "title", "dc.description": "description" }}
            page={page || 0}
            handlePageChange={this.handlePageChange.bind(this)}
            linkCol="dc.identifier"
            total_count = {total_count}
          />
          {/* </Paper> */}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ dataSpace, entity }, ownProps) => {
  console.debug("Data space");
  console.debug(dataSpace);
  console.debug(ownProps);
  //   const { source } = ownProps;
  //   // const sourceConfig = DATASPACE_SOURCES[ownProps.source] || {};

  //   if (dataSpace.source !== ownProps.source) {
  //     return { entity, sourceConfig };
  //   }
  return { ...dataSpace, entity };
};

export default withStyles(styles)(
  connect(mapStateToProps)(DataSpaceFreeTextSearch)
);
