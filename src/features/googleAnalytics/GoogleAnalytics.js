import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'
import { Route } from 'react-router-dom'

class GoogleAnalytics extends Component {
    componentDidMount () {
        this.logPageChange(
            this.props.location.pathname,
            this.props.location.search
        )
    }

    componentDidUpdate ({ location: prevLocation }) {
        const { location: { pathname, search } } = this.props
        const isDifferentPathname = pathname !== prevLocation.pathname
        const isDifferentSearch = search !== prevLocation.search

        if (isDifferentPathname || isDifferentSearch) {
            this.logPageChange(pathname, search)
        }
    }

    logPageChange (pathname, search = '') {
        const page = pathname + search
        const { location } = window
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
            ...this.props.options
        })
        ReactGA.pageview(page)
    }

    render () {
        return null
    }
}

GoogleAnalytics.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string
    }).isRequired,
    options: PropTypes.object
}

const RouteTracker = () => <Route component={GoogleAnalytics} />

const init = (options = {}) => {
    console.log("GA");
    console.log(process.env.REACT_APP_GA_TRACKING_ID);
    const trackingId = process.env.REACT_APP_GA_TRACKING_ID

    if (trackingId) {
        ReactGA.initialize(trackingId)
    }

    return typeof trackingId != 'undefined'
}

export default {
    GoogleAnalytics,
    RouteTracker,
    init
}