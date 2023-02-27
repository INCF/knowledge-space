import React, { Component } from 'react'
import { findCurieByExternalId } from 'clients/EntityClient'
import { Redirect } from 'react-router'
export default class WikiPage extends Component {

  state = { externalId: null, curie: null }

  componentDidMount() {
    const { externalId } = this.props.match.params;
    findCurieByExternalId(externalId).then(function (curie) { 
      this.setState({ externalId, curie }) 
    }.bind(this));
  }

  render() {
    const { externalId } = this.props.match.params;
    const { curie } = this.state;
    if (curie && externalId == this.state.externalId) {
      return (<Redirect to={`/wiki/${curie}`} />)
    } else { return null }
  }

}
