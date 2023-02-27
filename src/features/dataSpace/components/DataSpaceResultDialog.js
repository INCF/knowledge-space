import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import TableRow from "@material-ui/core/TableRow";


import { values, keys, get, isArray, has, sortBy,isString } from "lodash";

const cellValue = (value = "", source = null, key = null) => {
  if (isArray(value)) {
    return value.join("; ");
  }
  return isString(value) ? value : JSON.stringify(value);
};

const createDataURLForEbrains = (source) => {
  const id = source.item ? source.item.id : null;
  return "https://kg.ebrains.eu/search/instances/Dataset/" + id;
};

const styles = (theme) => ({
  dialogHeading: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  divider:{
    marginTop:10
  }
});

const isEbrains = index => index === "scr_017612_ebrains";

 const DataSpaceDialogeResult = ({isOpen,onClose,entityData, index, fullScreen, classes}) => {
  console.debug("Check entity data");
  console.debug(entityData);
  const isEbrainIndex =  isEbrains(index);

  const titleKey = isEbrainIndex ? "item.name" : "dc.title";
  const descKey = isEbrainIndex ? "item.description" : "dc.description";
  const link = isEbrainIndex ? createDataURLForEbrains(entityData._source) : cellValue(get(entityData._source, "dc.identifier"), entityData._source,  "dc.identifier")
  return (
    <Dialog
      fullWidth={true}
      maxWidth = {'lg'}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="customized-dialog-title" className={classes.dialogHeading} onClose={onClose}>
          Details 
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
            {cellValue(get(entityData._source,titleKey), entityData._source, titleKey)}
        </Typography>
        <Typography variant="subtitle2">
            {cellValue(get(entityData._source, descKey), entityData._source,  descKey)}
        </Typography>
        <a href={link} target="_blank">
            {link}
        </a>
        <Divider className={classes.divider}/>
        <Typography variant="h6">
            Other attributes
        </Typography>
        <Table>
            <TableBody>
            {keys(entityData._source).sort().map((key, i) => (

              <TableRow key={i}>
                <TableCell>
                    {key}
                </TableCell>
                <TableCell>
                 {cellValue(get(entityData._source, key), entityData._source, key)
                 }
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(DataSpaceDialogeResult);