import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import { DARK_MODE, LIGHT_MODE } from 'common/theme/theme';
import { withTheme } from 'common/theme/ThemeContext';

const styles = (theme) => ({
  toggle: {
    color: 'inherit',
    padding: 6,
    marginLeft: theme.spacing.unit / 2,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    // Keep a clearly visible focus ring for keyboard users; the icon alone is
    // not a sufficient affordance.
    '&:focus': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
  },
});

export class ThemeToggle extends Component {
  handleClick = () => {
    const { toggleMode } = this.props;
    if (toggleMode) {
      toggleMode();
    }
  };

  render() {
    const { classes, mode } = this.props;
    const isDark = mode === DARK_MODE;
    // Show the mode the user would switch *to*, which is the opposite of the
    // current one.
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    return (
      <Tooltip title={label}>
        <IconButton
          className={classes.toggle}
          color="inherit"
          onClick={this.handleClick}
          aria-label={label}
          aria-pressed={isDark}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    );
  }
}

ThemeToggle.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.oneOf([LIGHT_MODE, DARK_MODE]),
  toggleMode: PropTypes.func,
};

export default withStyles(styles)(withTheme(ThemeToggle));
