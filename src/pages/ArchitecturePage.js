import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import architecture from "imgs/KS_Architecture.png";
import architecture from "imgs/KS_Architecture.jpg";

const styles = (theme) => ({
  title: {
    marginBottom: ".5em",
    textAlign: "left",
  },
  image: {
    marginLeft: "-50px",
  },
  body: { marginBottom: "1.5em" },
});

class ArchitecturePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Architecture diagram
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img className={classes.image} src={architecture} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ArchitecturePage);
