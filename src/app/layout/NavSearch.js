import React from 'react';

import { withRouter } from 'react-router-dom';
import keycode from 'keycode';
import compose from 'recompose/compose';
import EventListener from 'react-event-listener';

import {isEmpty} from 'lodash'

import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

let searchTimer;
let initialized = false;

// This was taken from the material-ui docs pages, as it has the same pattern we want. This 
// if for a typeahead search bar, but allows for a bit of time between issuing a search to 
// the server. 
function initDocsearch() {

  clearInterval(searchTimer);
  searchTimer = setInterval(() => {
    const docsearchInput = document.querySelector('#docsearch-input');

    if (!window.docsearch || !docsearchInput) {
      return;
    }

    if (initialized === docsearchInput) {
      clearInterval(searchTimer);
      return;
    }

    initialized = docsearchInput;
    clearInterval(searchTimer);
    /*
TO-DO: enter the ES code here...
window.docsearch({
      apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
      indexName: 'material-ui',
      inputSelector: '#docsearch-input',
      handleSelected: (input, event, suggestion) => {
        const url = suggestion.url
          .replace(/^https:\/\/material-ui\.com/, '')
          .replace(/\/#/, '#')
          .replace(/\/$/, '');
        Router.push(url);
      },
      // Set debug to true if you want to inspect the dropdown.
      // debug: true,
    }); */
  }, 100);


}

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    '& $inputInput': {
      transition: theme.transitions.create('width'),
      width: 120,
      '&:focus': {
        width: 170,
      },
    },
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 9}px`,
  },
});

class NavSearch extends React.Component {
  handleKeyDown = event => {
    if (
      ['/', 's'].indexOf(keycode(event)) !== -1 &&
      document.activeElement.nodeName.toLowerCase() === 'body' &&
      document.activeElement !== this.inputRef
    ) {
      event.preventDefault();
      this.inputRef.focus();
    } else if (
      keycode(event) == 'enter' &&
      document.activeElement === this.inputRef &&
      !isEmpty(event.target.value)
    ) { 
      this.props.history.push({pathname: '/search', search: `q=${event.target.value.trim()}` })
    }
  };

  render() {
    const { classes, width } = this.props;

    if (isWidthUp('sm', width)) {
      initDocsearch();
    }

    return (
      <div className={classes.root} style={{ display: isWidthUp('sm', width) ? 'flex' : 'none' }}>
        <EventListener target="window" onKeyDown={this.handleKeyDown.bind(this)} />
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder="Search…"
          id="docsearch-input"
          inputRef={ref => {
            this.inputRef = ref;
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

NavSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default withRouter(compose(
  withStyles(styles),
  withWidth(),
)(NavSearch));
