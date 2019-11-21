import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { durationConvertToTotaltime, getDetails } from '../helpers'
import SegmentDetails from "./SegmentDetails";

const styles = theme => ({
  root: {
    width: "100%",
    // background: theme.palette.secondary.light,
    color: "inherit",
    fontSize: "0.8rem"
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,

    marginBottom: "10px"
  },
  col: {
    width: "100%"
  },
  duration: {
    textAlign: "right"
  },
  segments: {
    fontSize: "0.7rem"
  }
});

const LegDetails = ({ classes, legDetails, data }) => {

  const {
    Directionality,
    OriginStationDetails,
    DestinationStationDetails,
    Duration
  } = legDetails;

  const newDuration = durationConvertToTotaltime(Duration);

  const segments = legDetails.SegmentsDetails.map(segment => {
    const relevantDataDetailes = {
      ...segment,
      Carrier: getDetails(segment.Carrier, data.Carriers),
      OperatingCarrier: getDetails(segment.OperatingCarrier, data.Carriers),
      DestinationStation: getDetails(segment.DestinationStation, data.Places),
      OriginStation: getDetails(segment.OriginStation, data.Places)
    };

    return (
      <SegmentDetails
        data={data}
        key={segment.Id}
        {...relevantDataDetailes}
        fullLegDetails={legDetails}
      />
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={`${classes.col} ${classes.directionality}`}>
          {Directionality} , {OriginStationDetails.Code} -{" "}
          {DestinationStationDetails.Code}, {newDuration}
        </div>
      </div>
      <div className={classes.segments}>{segments}</div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LegDetails);
