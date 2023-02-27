import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import hbp from "imgs/hbp-logo.png";
import nif from "imgs/nif-logo.png";
import incf from "imgs/incf-logo.svg";

import Autosuggest from "features/autosuggest/Autosuggest";

const styles = (theme) => ({
  inputRoot: {},
  inputInput: {
    fontSize: theme.typography.h5.fontSize,
    paddingLeft: "10px",
  },
  searchContainer: {
    marginTop: "20px",
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    "&:hover": {
      boxShadow: theme.shadows[5],
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
  },
  logoContainer: {
    marginTop: "25px",
  },
  logo: {
    maxWidth: "90%",
  },
  card: {
    minWidth: 175,
    maxWidth: "80%",
    margin: "auto",
  },
  button: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  link: {
    color: "#000",
  },
});

class AboutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            KnowledgeSpace (KS) is a joint development between the Human Brain Project (HBP), the International Neuroinformatics Coordinating Facility (INCF), and the Neuroscience Information Framework (NIF) that aims to create a globally-used, data-driven encyclopedia and search engine for the neuroscience community. Descriptions of neuroscience research concepts, publicly available datasets, publications, and much more can be discovered across multiple resources through KnowledgeSpace.
          </Typography>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            All content is curated and accessible from a search interface where users can perform a simple keyword search or a search based on the curated concepts. As an encyclopedia, KS provides users with curated definitions of brain research concepts found in different neuroscience ontologies, Wikipedia, and dictionaries. As a search engine, KS enables users to discover publicly available neuroscience datasets from many large-scale brain initiatives in a universally accessible and useful way. What distinguishes KS from other neuroscience encyclopedias and data catalogs is that KS links the neuroscience research concepts found in the encyclopedia to datasets found in publicly accessible data repositories and related publications indexed in PubMed. All of this information is accessible from a search interface where the community can perform a simple keyword search or a search based on the curated concepts to discover descriptions, datasets, publications, and more.
          </Typography>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            The KS development team actively promotes the adherence to <a target="_blank" className={classes.link} href="https://www.incf.org/what-is-fair">FAIR Guiding Principles for scientific data management and stewardship</a> , thus ensuring that all data providers indexed in KS follow standards and best practices for data storage and publication. As more and more data publishers adhere to the FAIR Guiding Principles, the quality of data discovery through KS will improve.
          </Typography>
          <br />
          <Typography variant="body1" align="justify" gutterBottom>
            This project/research has received funding from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 945539 (Human Brain Project SGA3).
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            <Button
              // rel='noopener'
              // target="_blank"
              color="primary"
              className={classes.button}
              onClick={() => this.props.history.push("/documentation")}
            // href='https://docs.google.com/document/d/1cNtiwtt5uu1EjguNxU9y1FiizDi2_XRXUMZq3G8yB-Y/edit'
            >
              How To Documentation
            </Button>
            <Button
              rel="noopener"
              target="_blank"
              color="secondary"
              className={classes.button}
              href="https://github.com/OpenKnowledgeSpace/KnowledgeSpace"
            >
              Technical Documentation
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} classes={{ item: classes.logoContainer }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Partners
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item xs={4}>
              <a target="_blank" href="https://humanbrainproject.eu/">
                <img alt="HBP" className={classes.logo} src={hbp} />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href="https://www.neuinfo.org">
                <img alt="NIF" className={classes.logo} src={nif} />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a target="_blank" href="https://www.incf.org">
                <img alt="INCF" className={classes.logo} src={incf} />
              </a>
            </Grid>
          </Grid>
          <Grid item classes={{ item: classes.logoContainer }} xs={12}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">
                  Hosted By: <a href="https://www.incf.org">INCF</a>
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Karolinska Institutet
                  <br />
                  Nobels väg 15 A SE-171 77
                  <br />
                  Stockholm Sweden
                  <br />
                  <a href="mailto:knowledgespace@incf.org">
                    knowledgespace@incf.org
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item classes={{ item: classes.logoContainer }} xs={12}></Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutPage);
