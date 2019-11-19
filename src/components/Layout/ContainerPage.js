import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import DotLoader from "react-spinners/DotLoader";
import InsparationList from "../InsparationList/InsparationList";

const styles = theme => ({
  root: {
    background: theme.palette.primary.light,
    border: 0,
    height: "100%",
    color: theme.palette.primary.dark,
    padding: "30px 30px",
    textAlign: "center",
    width: "100%"
  },
  loadingContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

const ContainerPage = ({ classes, isFetching, cityByIp, getOffers }) => {
  const theme = useTheme();

  const handleOffers = data => {
    getOffers(data);
  };

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
        <div>
          <InsparationList cityByIp={cityByIp} getOffers={handleOffers} />
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ContainerPage);
