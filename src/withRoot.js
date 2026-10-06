import React from 'react'

// The application-wide Material-UI theme lives in `common/theme/theme.js`, and
// ThemeManager holds the active light/dark mode and provides it to
// `withTheme`. Keeping this HOC thin means the whole tree sits below a single
// theme provider, so switching modes re-themes every `withStyles` consumer.
import ThemeManager from 'common/theme/ThemeContext'

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <ThemeManager>
        <Component {...props} />
      </ThemeManager>
    )
  }

  return WithRoot
}

export default withRoot
