import React from "react";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import HomePage from "pages/HomePage";
import EntityPage from "pages/EntityPage";
import SearchPage from "pages/SearchPage";
import DataSpacePage from "pages/DataSpacePage";
import LiteraturePage from "pages/LiteraturePage";
import AboutPage from "pages/AboutPage";
import WikiPage from "pages/WikiPage";
import ExternalIdPage from "pages/ExternalIdPage";
import MBAPage from "pages/DetailsByMBAPage";
import DocumentationPage from "pages/DocumentationPage";
import ContributePage from "pages/ContributePage";
import ArchitecturePage from "pages/ArchitecturePage";
import GraphPage from "../../pages/GraphPage";
import Nav from "./Nav";

const styles = (theme) => ({
  root: {
    flex: "1 1 100%",
    paddingTop: "40px",
    paddingLeft: "20px",
  },
});

const AppLayoutPlain = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      {props.noNavBar ? null : React.createElement(Nav)}
      <main className={classes.root}>{props.children}</main>
    </React.Fragment>
  );
};

const AppLayout = withStyles(styles)(AppLayoutPlain);

const AppRoute = ({ component, ...AppRouteProps }) => {
  return (
    <Route
      {...AppRouteProps}
      render={(props) => {
        return (
          <AppLayout {...props} {...AppRouteProps}>
            {React.createElement(component, props)}
          </AppLayout>
        );
      }}
    />
  );
};

const Main = (props) => {
  return (
    <Switch>
      <AppRoute exact path="/" component={HomePage} />
      <AppRoute exact path="/about" component={AboutPage} />
      <AppRoute exact path="/documentation" component={DocumentationPage} />
      <AppRoute exact path="/how-to-contribute" component={ContributePage} />
      <AppRoute exact path="/ks-architecture" component={ArchitecturePage} />
      <AppRoute exact path="/t/:slug" component={EntityPage} />
      <AppRoute exact path="/wiki/" component={WikiPage} />
      <AppRoute exact path="/search" component={SearchPage} />
      <AppRoute
        exact
        path="/dataspace/:source"
        component={DataSpacePage}
      />
      <AppRoute
        exact
        path="/wiki/:slug/literature"
        component={LiteraturePage}
      />
      <AppRoute exact path="/wiki/:curie" component={WikiPage} />
      <AppRoute exact path="/external/:externalId" component={ExternalIdPage} />
      {/* <AppRoute noNavBar={true} exact path="/external/:externalId/:type" component={MBAPage} /> */}
      <AppRoute exact path="/brain-regions" component={GraphPage} />
    </Switch>
  );
};
export default withStyles(styles)(Main);
