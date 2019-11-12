import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
  
    padding: "0 30px",
    textAlign: "center",
    // position: "absolute",
    // bottom: "0px",
        width: "100%",
    height: '100%'
  }
});

function ContainerPage(props) {
  const { classes, isFetching } = props;
  return (
    <div className={classes.root}>
      {isFetching ? (
        <>
          <p>I'm Fetchong the Data</p>
          <LinearProgress />
        </>
      ) : (
        <>
          <p>I'm the Opening Page</p>
          
        </>
      )}
    </div>
  );
}

export default withStyles(styles)(ContainerPage);
