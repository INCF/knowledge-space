import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  title: {
    marginBottom: ".5em",
    textAlign: "left",
  },
  listItemParent: {
    textAlign: "left",
    "& li": {
      padding: 5,
      fontSize: theme.typography.body1.fontSize,
      "& p": {
        marginBottom: 0,
      },
    },
  },
  body: { marginBottom: "1.5em" },
});

class ContributePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className={classes.title}>
            How to contribute?
          </Typography>
          <Typography variant="body1" align="justify" className={classes.body}>
            There are four basic ways to contribute to{" "}
            <a target="_blank" href="https://knowledge-space.org/">
              KnowledgeSpace
            </a>
            . In order of increasing effort, these are: edit summary sections
            via ksdesc, add new terms via InterLex, ontologically model terms,
            curate data using KS terms and integrate it into the dataspace. More
            details are provided below.
          </Typography>
          <div>
            <ul className={classes.listItemParent}>
              <li>
                <Typography variant="h5" className={classes.title}>
                  Summary sections
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      <a
                        target="_blank"
                        href="https://github.com/OpenKnowledgeSpace/ksdesc"
                      >
                        https://github.com/OpenKnowledgeSpace/ksdesc
                      </a>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="subheading" className={classes.title}>
                      It is possible to contribute to these immediately using
                      the{" "}
                      <a target="_blank" href="http://prose.io">
                        http://prose.io
                      </a>{" "}
                      links at the top right of the summary section. You can
                      also clone the repository and create or edit the text
                      files by following the{" "}
                      <a target="_blank" href="http://prose.io">
                        https://github.com/OpenKnowledgeSpace/ksdesc/blob/master/README.md
                      </a>
                    </Typography>
                  </li>
                </ul>
              </li>
              <li>
                <Typography variant="h5" className={classes.title}>
                  Terminology
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      <a
                        target="_blank"
                        href="https://interlex.org/scicrunch/interlex/dashboard"
                      >
                        https://interlex.org/scicrunch/interlex/dashboard
                      </a>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      You can search for existing terms, and if the term you
                      want to add does not exist, then you can add it via{" "}
                      <a
                        target="_blank"
                        href="https://interlex.org/scicrunch/interlex/create"
                      >
                        https://interlex.org/scicrunch/interlex/create
                      </a>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      The most important piece of information that we will need
                      is the superclass field which points to an existing class.
                    </Typography>
                  </li>
                </ul>
              </li>
              <li>
                <Typography variant="h5" className={classes.title}>
                  Ontology
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      <a
                        target="_blank"
                        href="https://github.com/SciCrunch/NIF-Ontology"
                      >
                        https://github.com/SciCrunch/NIF-Ontology
                      </a>
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      This is a more lengthy process which includes deeper
                      conceptual modelling and requires participation of domain
                      experts working together with ontologists.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      The first step here is to determine whether the
                      terminology you need already exists (via InterLex) and to
                      add any terminology that does not currently exist.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      One way to make ontology work tractable is to clearly
                      delimit the scope of what you wish to build a model of,
                      for example for glia one could focus on representing our
                      knowledge of how glia directly modulate neuronal activity.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      We are developing a process to contribute new sets of
                      terms in bulk, please see the{" "}
                      <a
                        target="_blank"
                        href="https://github.com/tgbugs/pyontutils/tree/master/development"
                      >
                        documentation.
                      </a>
                    </Typography>
                  </li>
                </ul>
              </li>
              <li>
                <Typography variant="h5" className={classes.title}>
                  Data
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      The current workflow for this is in flux
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" className={classes.title}>
                      The basic outline is as follows:
                      <ul>
                        <li>
                          <Typography variant="body1" className={classes.title}>
                            provide information about how to access to your data
                            so that it can be crawled
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1" className={classes.title}>
                            tag your data (normalize your column names, and/or
                            values) using the terminology that backs
                            KnowledgeSpace (e.g. the Concept URI in the Lexicon
                            panel, or the curied form that is the identifier
                            after wiki/{" "}
                            <a
                              target="_blank"
                              href="https://knowledge-space.org/wiki/NIFCELL:sao1394521419"
                            >
                              https://knowledge-space.org/wiki/NIFCELL:sao1394521419
                            </a>
                          </Typography>
                        </li>
                      </ul>
                    </Typography>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ContributePage);
