import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

import DataSpaceDialogeResult from "./DataSpaceResultDialog";

import { values, keys, get, isArray, has } from "lodash";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  table: {
    minWidth: 1020,
  },
  total: {
    marginLeft: "auto",
    paddingTop: 10,
    textAlign: "right",
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
  },
  searchHeading: {
    display: "flex",
    justifyContent: "flex-start",
  },
  searchHeadingTitle: {
    paddingTop: 5,
    marginLeft: 10,
  },
});

const cellValue = (value = "", source = null, key = null) => {
  if (isArray(value)) {
    return value.join("; ");
  }
  return value;
};

// fix: Specific to EBRAINS
const createDataURLForEbrains = (source) => {
  const id = source.item ? source.item.id : null;
  return "https://kg.ebrains.eu/search/instances/Dataset/" + id;
};

const DataSpaceResults = ({
  hits,
  classes,
  columns,
  page,
  handlePageChange,
  index,
  label,
  slug,
  total_count,
}) => {
  const results = has(hits, "hits") ? hits.hits : [];
  const total = total_count || ( has(hits, "total") ? hits.total.value : 0 )
  let elem = null;
  if (hits && hits.total) {
    elem = total_count || get(hits.total, "value") || 0;
  } else {
    elem = total_count || get(hits, "total") || 0;
  }

  const [dialogState, setDialogState] = React.useState({
    isDialgueOpen: false,
    entityData: null,
  });

  const handleClickOpen = (data) => {
    setDialogState({ isDialgueOpen: true, entityData: data });
  };
  const handleClose = () => {
    setDialogState({ isDialgueOpen: false, entityData: null });
  };
  return (
    <div className={classes.root}>
      <div className={classes.searchHeading}>
        <Typography variant="h5" className={classes.searchHeadingTitle}>
          {label} Results
        </Typography>
        <Typography variant="subtitle1" className={classes.total}>
          {elem} records found
        </Typography>
      </div>
      <Divider />
      <Table className={classes.table} aria-labelledby="tableTitle">
        <TableHead>
          <TableRow>
            {values(columns).map((val, i) => (
              <TableCell key={i}>{val}</TableCell>
            ))}
            <TableCell> View more</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {index === "scr_017612_ebrains"
            ? results.map((hit) => (
                <TableRow
                  key={hit._id}
                  hover
                  onClick={(event) =>
                    window.open(createDataURLForEbrains(hit._source), "_blank")
                  }
                  role="checkbox"
                  tabIndex={-1}
                >
                  {keys(columns).map((key, i) => (
                    <TableCell key={i}>
                      {cellValue(get(hit._source, key), hit._source, key)}
                    </TableCell>
                  ))}
                  <TableCell>
                    <a
                      href="#"
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        handleClickOpen(hit);
                      }}
                    >
                      View more{" "}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            : results.map((hit) => (
                <TableRow
                  key={hit._id}
                  hover
                  onClick={(event) =>
                    window.open(get(hit._source, "dc.identifier"), "_blank")
                  }
                  role="checkbox"
                  tabIndex={-1}
                >
                  {keys(columns).map((key, i) => (
                    <TableCell key={i}>
                      {cellValue(get(hit._source, key))}
                    </TableCell>
                  ))}
                  <TableCell>
                    <a
                      href="#"
                      onClick={(ev) => {
                        ev.preventDefault();
                        ev.stopPropagation();
                        handleClickOpen(hit);
                      }}
                    >
                      {" "}
                      View more{" "}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={total}
        rowsPerPage={25}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={() => {}}
      />
      {dialogState.isDialgueOpen && (
        <DataSpaceDialogeResult
          isOpen={dialogState.isDialgueOpen}
          onClose={handleClose}
          index = {index}
          entityData={dialogState.entityData}
        ></DataSpaceDialogeResult>
      )}
    </div>
  );
};

export default withStyles(styles)(DataSpaceResults);
