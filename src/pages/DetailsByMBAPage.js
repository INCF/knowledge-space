import React, { Component } from 'react'
import { findDetailsByExternalId } from 'clients/EntityClient'
export default class MBAPage extends Component {

    state = { externalId: null, details: null }

    componentDidMount() {
        const { externalId, type } = this.props.match.params;
        findDetailsByExternalId(externalId, type).then(function (details) {
            this.setState({ externalId, details })
        }.bind(this));
    }

    render() {
        const { externalId } = this.props.match.params;
        const { details } = this.state;
        if (details && externalId == this.state.externalId) {
            return ( this.state.details)
        } else { return null }
    }

}
