import React, { Component } from "react";

import { connect } from "react-redux";

import { isArray, keys, isEmpty } from "lodash";
import Detail from "../entity/components/Detail";
import { updateEntityAndSource, updateFilters } from "./dataSpaceActions";

import DataSpaceSearch from "./DataSpaceSearch";
import DataSpaceSourceDescription from "./components/DataSpaceSourceDescription";

/* This is probably Dead Code */
class DataSpace extends Component {
  componentDidMount() {
    const { slug, source } = this.props;
    this.props.dispatch(updateEntityAndSource({ hash, source }));
  }

  render() {
    const { entity, source, history } = this.props;
    return (
      <div>
        <h2>DataSpace</h2>
        <DataSpaceSourceDescription source={source} />
        <Detail entity={entity} />
        {!isEmpty(source) && <DataSpaceSearch history={history} />}
      </div>
    );
  }
}

const mapStateToProps = ({ entity, dataSpace }) => {
  const { source } = dataSpace;
  return { entity, source };
};

export default connect(mapStateToProps)(DataSpace);
