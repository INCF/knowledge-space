import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import Logo from "./Logo";
import NavSearch from "./NavSearch";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import logoImage from "../../imgs/new_logo.png";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import FeedbackIcon from "@material-ui/icons/Feedback";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing.unit,
    padding: 4,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "initial !important",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grow: { flex: "1 1 auto" },
  inputRoot: {
    color: "inherit",
    width: "100%",
    position: "relative",
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& $inputInput": {
      transition: theme.transitions.create("width"),
      width: 120,
      "&:focus": {
        width: 170,
      },
    },
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

const AboutLink = (props) => <RouterLink to="/about" {...props} />;

class Nav extends React.Component {
  state = {
    aboutAnchorEl: null,
    resourcesAnchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleLogoClick = () => {
    this.props.history.push("/");
  };

  handleAboutMenuOpen = (event) => {
    this.setState({ aboutAnchorEl: event.currentTarget });
  };

  handleResourcesMenuOpen = (event) => {
    this.setState({ resourcesAnchorEl: event.currentTarget });
  };

  handleAboutClick = () => {
    this.props.history.push("/about");
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ resourcesAnchorEl: null, aboutAnchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { resourcesAnchorEl, aboutAnchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;

    const isHome = window.location.pathname == "/";

    const isResourcesMenuOpen = Boolean(resourcesAnchorEl);
    const isAboutMenuOpen = Boolean(aboutAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderAboutMenu = (
      <Menu
        anchorEl={aboutAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isAboutMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleAboutClick}>
          About KnowledgeSpace
        </MenuItem>
        <MenuItem onClick={() => {
          this.handleMenuClose();
          window.open("https://support.incf.org");
        }}>Contact us</MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/documentation");
          }}
        >
          How to documentation
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/how-to-contribute");
          }}
        >
          How to contribute
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            window.open("https://github.com/OpenKnowledgeSpace/KnowledgeSpace");
          }}
        >
          Technical documentation
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/ks-architecture");
          }}
        >
          Architecture diagram
        </MenuItem>
      </Menu>
    );

    const renderResourcesMenu = (
      <Menu
        anchorEl={resourcesAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isResourcesMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* <MenuItem title="Ebrains Knowledge Graph" onClick={() => window.open('https://kg.ebrains.eu/search/?facet_type[0]=Dataset')}>
            
        </MenuItem> */}
        <MenuItem
          data-html="true"
          title="Repository of atlases and analytic tools developed by HBP to use on KnowledgeSpace data"
          onClick={() => {
            this.handleMenuClose();
            window.open("https://ebrains.eu/services/atlases/");
          }}
        >
          EBRAINS atlases and analytic tools
        </MenuItem>
        <MenuItem
          title="Repository of tutorials on tools to use on KnowledgeSpace data"
          onClick={() => {
            this.handleMenuClose();
            window.open("https://training.incf.org/");
          }}
        >
          TrainingSpace
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {/* <MenuItem onClick={() => {
           this.handleMenuClose()
           window.open('https://kg.ebrains.eu/search/?facet_type[0]=Dataset')}
           }>
          EBRAINS
        </MenuItem> */}
        <MenuItem
          title="Repository of atlases and analytic tools developed by HBP to use on KnowledgeSpace data"
          onClick={() => {
            this.handleMenuClose();
            window.open("https://ebrains.eu/services/atlases/");
          }}
        >
          EBRAINS atlases and analytic tools
        </MenuItem>
        <MenuItem
          title="Repository of tutorials on tools to use on KnowledgeSpace data"
          onClick={() => {
            this.handleMenuClose();
            window.open("https://training.incf.org/");
          }}
        >
          TrainingSpace
        </MenuItem>

        <MenuItem onClick={this.handleAboutClick}>
          About KnowledgeSpace
        </MenuItem>
        <MenuItem onClick={() => {
          this.handleMenuClose();
          window.open("https://support.incf.org");
        }}>Contact us</MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/documentation");
          }}
        >
          How to documentation
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/how-to-contribute");
          }}
        >
          How to contribute
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            window.open("https://github.com/OpenKnowledgeSpace/KnowledgeSpace");
          }}
        >
          Technical documentation
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.handleMenuClose();
            this.props.history.push("/ks-architecture");
          }}
        >
          Architecture diagram
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              classes={{ colorInherit: classes.menuButton }}
              color="inherit"
              onClick={this.handleLogoClick}
              aria-label="Go To Frontpage"
            >
              {/* <Logo />  */}
              <img src={logoImage} />
            </IconButton>
            {/* <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <RouterLink className={classes.title} to='/'>
                Knowledge Space 
              </RouterLink>
            </Typography> */}
            <div className={classes.grow} />
            {!isHome && <NavSearch />}
            <div className={classes.sectionDesktop}>
              <Typography
                className={classes.menuButton}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Button onClick={this.handleResourcesMenuOpen} color="inherit">
                  Resources
                </Button>
              </Typography>
              <Typography
                className={classes.menuButton}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Button onClick={this.handleAboutMenuOpen} color="inherit">
                  About
                </Button>
              </Typography>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderResourcesMenu}
        {renderAboutMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Nav));
