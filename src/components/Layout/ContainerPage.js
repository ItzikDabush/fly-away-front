import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import DotLoader from "react-spinners/DotLoader";

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
    height: "100%"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

function ContainerPage(props) {
  const theme = useTheme();
  const { classes, isFetching } = props;
  console.log(theme);
  return (
    <div className={classes.root}>
      {isFetching ? (
        <div className={classes.loadingContainer}>
          <p>I'm Getting the Details</p>
          <DotLoader
            sizeUnit={"px"}
            size={150}
            color={theme.palette.secondary.main}
            loading
          />
        </div>
      ) : (
        <div>
          <p>I'm the Opening Page</p>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(ContainerPage);
