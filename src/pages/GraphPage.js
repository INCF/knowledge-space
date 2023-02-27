import React, { Component } from 'react';
import { Input, Button, TextField } from '@material-ui/core';
import { submitBrainRegionSearch } from '../features/brainRegion/brainRegionSearchActions';
import { connect } from 'react-redux';
import '../features/brainRegion/brainRegionSearch.css';
import DagreGraph from '../common/components/dagre-graph/dagre-graph';


class GraphPage extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: "" }
  }

  prepareGraphData = () => {
    console.debug("check results");
    console.debug(this.props.graphData);
  }

  componentDidUpdate = () => {
    console.debug("check results");
    console.debug(this.props.graphData);
  }

  handleSearchClick = () => {
    if (this.inputRef.value) {
      this.props.dispatch(submitBrainRegionSearch({ searchText: this.inputRef.value }))
    }
  }

  handleBrainRegionClick = (e) => {
    const nodeData = e.original;
    console.debug("check node data");
    console.debug(nodeData);
    this.inputRef.value = nodeData.label;
    this.setState({
      ...this.state,
      searchText: nodeData.label,
    })
    this.props.dispatch(submitBrainRegionSearch({ searchText: nodeData.label }))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className="search-box-wrapper">
          <TextField
            placeholder="Enter a term..."
            id="docsearch-input"
            onChange={this.handleSearchChange}
            inputRef={ref => {
              this.inputRef = ref;
            }}
          />
          <Button variant="contained" color="primary" onClick={this.handleSearchClick}>Search</Button>
        </div>
        <div className="graph-parent-wrapper">
          {this.props.graphData.nodes.length > 0 ? <DagreGraph
            nodes={this.props.graphData.nodes}
            links={this.props.graphData.links}
            rankdir='LR'
            width='1500'
            x='0'
            y='0'
            height='650'
            animate={2000}
            shape='rect'
            nodesep={50}
            edgesep={30}
            ranksep={100}
            zoomable={true}
            fitBoundaries
            className="brain-region-graph"
            onNodeClick={this.handleBrainRegionClick}
            onRelationshipClick={e => console.log(e)}
          /> : <div className="no-results">No relation present</div>}
        </div>
      </div>
    )
  }
}

const prepareNodeObj = (nodeData) => {
  return {
    id: nodeData.id,
    label: nodeData.label
  }
}


const prepareEdgeObj = (sourceData, targetData) => {
  return {
    source: sourceData,
    target: targetData
  }
}

const transformDataForLayout = (graphData) => {
  console.debug("check data returned from graph");
  console.debug(graphData);
  const finalData = { nodes: [], links: [] };
  const allNodes = [];
  const allEdges = [];
  if (graphData && graphData.length) {
    for (const dataObj of graphData) {
      const details = dataObj._fields[0];
      const nodeObj_child = prepareNodeObj(details.child);
      allNodes.push(nodeObj_child);
      const nodeObj_term = prepareNodeObj(details.term);
      allNodes.push(nodeObj_term);
      const nodeObj_parent = prepareNodeObj(details.parent);
      allNodes.push(nodeObj_parent);
      const edge_child_term = prepareEdgeObj(details.child.id, details.term.id);
      allEdges.push(edge_child_term);
      const edge_term_parent = prepareEdgeObj(details.term.id,details.parent.id);
      allEdges.push(edge_term_parent);
    }
  }
  finalData.nodes = allNodes;
  finalData.links = allEdges;
  console.debug(finalData);
  return finalData;
}

const mapStateToProps = ({ brainRegionSearch }, ownProps) => {
  console.debug("map state after brain region search");
  console.debug(brainRegionSearch);
  return { graphData: transformDataForLayout(brainRegionSearch.graphData) };
}

export default connect(mapStateToProps)(GraphPage)
