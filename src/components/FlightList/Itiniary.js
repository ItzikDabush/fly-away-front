import React, { Component } from "react";
import LegSummery from "./LegSummery";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%"
  },
  legsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.7rem",
    marginBottom: "1rem",
    fontStyle: "italic",
    fontWeight: 500
  }
});


const Itiniary = ({
  classes,
  carriers,
  lowestPrice,
  outbound,
  inbound,
  itineraryDetails,
  data
}) => {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <p className={classes.itiniaryCarriers}>{carriers}</p>
        <p>
          {itineraryDetails.PricingOptions.length} Deals from{" "}
          {data.Currencies[0].Symbol} {lowestPrice}
        </p>
      </div>
      <div className={classes.legsContainer}>
        <LegSummery name="outbound" details={outbound.outboundDetails} />
        {inbound ? (
          <LegSummery name="inbound" details={inbound.inboundDetails} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Itiniary);
