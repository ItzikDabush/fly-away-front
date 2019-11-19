import React from "react";
import { withStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import differenceInMinutes from "date-fns/differenceInMinutes";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex"
  },
  leftCol: {
    width: "20%"
  },
  middleCol: {
    width: "60%",
    display: "flex",
    textAlign: "center"
  },
  imgContainer: {
    width: "40px",
    "& img": {
      maxWidth: "100%"
    },
    marginLeft: "10px"
  },
  rightCol: {
    width: "20%",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "10px 0"
  },
  details: {
    width: "100%"
  },
  divider: {
    margin: "5px 0"
  }
});

const SegmentDetails = props => {
  //refactor to move to helpers file
  //function to convert time duration of a flight in a total minutes to hh mm
  const timeConvert = n => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  };

  //refactor to move to helpers file
  const getDetails = (id, detailsOf) => {
    return detailsOf.find(detailedElement => detailedElement.Id === id);
  };

  const {
    classes,
    OriginStation,
    DestinationStation,
    DepartureDateTime,
    ArrivalDateTime,
    Carrier,
    Duration,
    FlightNumber,
    fullLegDetails,
    data
  } = props;

  const detailedDestinationStation =
    DestinationStation.Type === "Airport"
      ? getDetails(DestinationStation.ParentId, data.Places)
      : DestinationStation;
  const detailedOriginStation =
    OriginStation.Type === "Airport"
      ? getDetails(OriginStation.ParentId, data.Places)
      : OriginStation;

  const DepartureDayDate = format(new Date(DepartureDateTime), "MMM d");
  const DepartureDay = format(new Date(DepartureDateTime), "eee");
  const DepartureTime = format(new Date(DepartureDateTime), "HH:mm a");
  const ArrivalTime = format(new Date(ArrivalDateTime), "HH:mm a");
  const ArrivalDay = format(new Date(ArrivalDateTime), "eee");
  const DurationInHours = timeConvert(Duration);
  let layoverInMin;
  let layoverFull;

  // to fix the bug with 2 or more layovers
  if (DestinationStation.Id !== fullLegDetails.DestinationStation) {
    layoverInMin = differenceInMinutes(
      new Date(fullLegDetails.SegmentsDetails[1].DepartureDateTime),
      new Date(fullLegDetails.SegmentsDetails[0].ArrivalDateTime)
    );
    layoverFull = timeConvert(layoverInMin);
  }

  return (
    <div className={classes.root}>
      <div className={`${classes.smHeading} ${classes.leftCol}`}>
        {DepartureDay}, {DepartureDayDate}
      </div>
      <div className={classes.middleCol}>
        <div className={classes.imgContainer}>
          <img src={Carrier.ImageUrl} alt={Carrier.Name} />
        </div>
        <div className={classes.details}>
          <p>
            {DepartureTime} - {ArrivalTime}
          </p>
          <p>
            {detailedOriginStation.Name}({detailedOriginStation.Code}) -{" "}
            {detailedDestinationStation.Name}({detailedDestinationStation.Code})
          </p>
          <p>
            {Carrier.Name} {FlightNumber}
          </p>
          {DestinationStation.Id !== fullLegDetails.DestinationStation ? (
            <>
              <Divider className={classes.divider} />
              <p>Layover in {detailedDestinationStation.Name}</p>
              <Divider className={classes.divider} />
            </>
          ) : (
            ""
          )}
          <p></p>
        </div>
      </div>
      <div className={classes.rightCol}>
        {DurationInHours}
        <p>{layoverFull}</p>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SegmentDetails);
