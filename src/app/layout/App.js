import React, {Component} from 'react'
import DarkMode from './DarkMode'; 
import withRoot from 'withRoot'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import './App.css';
import Main from './Main'
import GA from 'features/googleAnalytics/GoogleAnalytics'

const styles = theme => ({
  root: {
    textAlign: 'center'
  }
})

class App extends Component {
  render() {
	  const {classes} = this.props

    return (
      <div className={classes.root}>
        { GA.init() && <GA.RouteTracker /> }
        <Main/>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(App))
