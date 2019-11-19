import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
    textAlign: "end",
    marginBottom: "10px"
  },
  col: {
    width: "20%"
  },
  duration: {
    textAlign: "right"
  },
  segments: {
    fontSize: "0.7rem"
  }
});

const LegDetails = ({ classes, legDetails, data }) => {
  //refactor to move to helpers file
  const getDetails = (id, detailsOf) => {
    return detailsOf.find(detailedElement => detailedElement.Id === id);
  };

  //refactor to move to helpers file
  const timeConvert = n => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  };

  const {
    Directionality,
    OriginStationDetails,
    DestinationStationDetails,
    Duration
  } = legDetails;

  const newDuration = timeConvert(Duration);

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
          {Directionality}
        </div>
        <div className={`${classes.col} ${classes.destinations}`}>
          {OriginStationDetails.Code} - {DestinationStationDetails.Code}
        </div>
        <div className={`${classes.col} ${classes.duration}`}>
          {newDuration}
        </div>
      </div>
      <div className={classes.segments}>{segments}</div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LegDetails);
