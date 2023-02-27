import React, { Component, useState } from "react";
import { connect } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import { Button } from "@material-ui/core";
import { searchStyles } from "../../pages/HomePage";
import { withStyles } from "@material-ui/core";
class FreeTextParent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: props.searchText };
  }
  renderInput({ classes, inputProps }) {
    return <InputBase classes={classes} inputProps={inputProps} />;
  }

  handleSearchValueUpdate = (e) => {
    this.setState(
      {
        searchText: e.target.value,
      },
      () => {
        if (this.props.onSearchInputChange) {
          this.props.onSearchInputChange(this.state.searchText);
        }
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSearchInputChange) {
      this.props.onSearchInputChange(this.state.searchText);
    } else {
      this.props.handleSubmit(event, this.state.searchText);
    }
  };

  render() {
    const { classes } = this.props;
    const renderInput = this.renderInput;
    const showSubmitButton = !this.props.hideSubmitButton;
    return (
      <div className={classes.search}>
        <form onSubmit={this.handleSubmit}>
          <div
            className={classes.spacingClass}
            style={{
              cursor: "text",
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderInput({
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
              },
              inputProps: {
                "aria-label": "naked",
                classes: { input: classes.SearchInput },
                className: classes.SearchInput,
                placeholder: "Search KnowledgeSpace",
                onChange: this.handleSearchValueUpdate,
                value: this.state.searchText,
              },
            })}
            {/* <SearchIcon onClick={handleSubmit} classes={{root: classes.searchIcon}}/> */}
            {showSubmitButton && (
              <Button
                variant="outlined"
                className={classes.searchButton}
                onClick={this.handleSubmit}
              >
                Go
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ autosuggest }) => {
  return { ...autosuggest };
};

export default connect(mapStateToProps)(
  withStyles(searchStyles)(FreeTextParent)
);
