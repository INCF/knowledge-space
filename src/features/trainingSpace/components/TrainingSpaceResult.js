import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";

const styles = (theme) => ({
  root: {},
  cardParent: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
    alignItems: "flex-start",
    border: "1px solid #CCC",
    margin: "10px",
  },
  total: {
    marginLeft: "auto",
  },
  title: {
    margin: "10px 0",
  },
  cardContent : {
    textAlign: "left",
    paddingTop: '5px !important',
    paddingBottom:'15px !important'
  },
  cardHeader : {
    display: "flex",
  },
  cardHeaderLink : {
    position: "absolute",
    right: "15px"
  },
  courseParent: {
    marginTop: '-10px',
    marginBottom: '10px'
  },
  courseTitle: {
    textDecoration: 'none'
  },
  courseChips: {
    color: '#ffffff',
    backgroundColor: '#4C9FE3',
    cursor: 'pointer'
  }

});

const TrainingSpaceResult = ({classes, result, disableGutters = true}) => {
  console.debug("check results")
  console.debug(result)
  const {URL, journal, journal_reference, Title, Topics, Description, Course, pub_date, pub_id} = result
  const link = `https://www.ncbi.nlm.nih.gov/pubmed/${pub_id}`

 // const primary = titleAndAuthors({title, authors, link})
  // const sub = journalAndYear({pub_type, journal, journal_reference, pub_date, abstract, pub_id})

  const chipStyles = {
    marginRight: '10px'
  }

  return (
  <Card
    className={classes.cardParent}
    key={Title}
    variant="outlined"
  >
    <CardHeader
      title={ <a target='_blank' href={result['URL']}>{Title}</a> }
    >
    </CardHeader>
    <CardContent className={classes.cardContent}>
    <Typography variant="body2" component="p" className={classes.courseParent}>
      <a target='_blank' className={classes.courseTitle} href={result['CourseURL']}> <Chip className={classes.courseChips} key={Course} label={Course} /></a>
    </Typography>
    <Typography variant="body2" component="p">
      {Description}
      </Typography>
      <Typography
        className={classes.title}
        color="textSecondary"
        gutterBottom
      >
      </Typography>
      {Topics && Topics.map( Topic  => 
          <Chip style={chipStyles} key={Topic} label={Topic} />
       )}
    </CardContent>
  </Card>
  )
}

export default withStyles(styles)(TrainingSpaceResult)
