import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import DotLoader from "react-spinners/DotLoader";
import InsparationList from '../InsparationList/InsparationList'

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: theme.palette.primary.dark,

    padding: "0 30px",
    textAlign: "center",
    // position: "absolute",
    // bottom: "0px",
    width: "100%",
    
  },
  loadingContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

function ContainerPage(props) {
  const theme = useTheme();
  const { classes, isFetching } = props;
  console.log(theme);

  const handleOffers = (data) => {
    props.getOffers(data)
  }

  return (
    <div className={classes.root}>
      {isFetching ? (
        <div className={classes.loadingContainer}>
          <DotLoader
            sizeUnit={"px"}
            size={150}
            color={theme.palette.secondary.main}
            loading
          />
          <p>I'm Getting the Details</p>
        </div>
      ) : (
        <div className={classes.loadingContainer}>
            <InsparationList getOffers={handleOffers}/>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(ContainerPage);
