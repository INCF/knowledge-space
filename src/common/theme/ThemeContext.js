import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import getTheme, {
  DARK_MODE,
  DARK_MODE_QUERY,
  LIGHT_MODE,
  getInitialMode,
  hasStoredMode,
  persistMode
} from './theme'

// Owns the active mode and exposes it to the theme toggle. Kept as plain React
// context rather than Redux because the theme is presentational state that is
// only ever read at the single Material-UI theme boundary.
export const ThemeContext = React.createContext({
  mode: LIGHT_MODE,
  toggleMode: () => {},
  setMode: () => {}
})

export class ThemeManager extends Component {
  constructor(props) {
    super(props)

    this.state = { mode: getInitialMode() }
    // public/index.html already applied the same resolution before React boots;
    // repeating it here keeps the document correct if that script is blocked.
    this.applyToDocument(this.state.mode)
  }

  componentDidMount() {
    this.mediaQuery = null

    if (typeof window.matchMedia !== 'function') {
      return
    }

    this.mediaQuery = window.matchMedia(DARK_MODE_QUERY)
    // Track OS changes, but only while the user has not made an explicit
    // choice: an explicit toggle always wins.
    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', this.handleSystemChange)
    } else if (this.mediaQuery.addListener) {
      // Safari < 14 and older Edge only expose the deprecated API.
      this.mediaQuery.addListener(this.handleSystemChange)
    }
  }

  componentWillUnmount() {
    if (!this.mediaQuery) {
      return
    }
    if (this.mediaQuery.removeEventListener) {
      this.mediaQuery.removeEventListener('change', this.handleSystemChange)
    } else if (this.mediaQuery.removeListener) {
      this.mediaQuery.removeListener(this.handleSystemChange)
    }
  }

  handleSystemChange = (event) => {
    if (hasStoredMode()) {
      return
    }
    this.setMode(event.matches ? DARK_MODE : LIGHT_MODE, false)
  }

  setMode = (mode, persist = true) => {
    this.setState({ mode }, () => {
      this.applyToDocument(mode)
      if (persist) {
        persistMode(mode)
      }
    })
  }

  toggleMode = () => {
    this.setMode(this.state.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE)
  }

  applyToDocument(mode) {
    const root = document.documentElement
    root.setAttribute('data-theme', mode)

    // Keep the mobile browser chrome in step with the page background.
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.setAttribute('content', getTheme(mode).palette.background.default)
    }
  }

  render() {
    const { mode } = this.state

    return (
      <ThemeContext.Provider
        value={{
          mode,
          toggleMode: this.toggleMode,
          setMode: (next) => this.setMode(next)
        }}
      >
        <MuiThemeProvider theme={getTheme(mode)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {this.props.children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    )
  }
}

ThemeManager.propTypes = {
  children: PropTypes.node
}

// Injects { mode, toggleMode, setMode } as props.
export function withTheme(Component) {
  const WithTheme = (props) => (
    <ThemeContext.Consumer>
      {(context) => <Component {...props} {...context} />}
    </ThemeContext.Consumer>
  )

  WithTheme.displayName = `withTheme(${Component.displayName || Component.name || 'Component'})`

  return WithTheme
}

export default ThemeManager
