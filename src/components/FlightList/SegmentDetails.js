import React, { Component } from "react";
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
    marginLeft: '10px',
  },
  rightCol: {
    width: "20%",
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: '10px 0',
  },
  details: {
    width: "100%"
  },
  divider: {
    margin: '5px 0',
  }
});

// refactor?  to functional comopnent
class SegmentDetails extends Component {
  timeConvert(n) {
    //function to convert time duration of a flight in a total minutes to hh mm
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  }

  getDetails(id, detailsOf) {
    return detailsOf.find(detailedElement => detailedElement.Id === id);
  }
  render() {
    const {
      classes,
      OriginStation,
      DestinationStation,
      DepartureDateTime,
      ArrivalDateTime,
      Carrier,
      Duration,
      FlightNumber,
      fullLegDetails
    } = this.props;

    const detailedDestinationStation =
      DestinationStation.Type === "Airport"
        ? this.getDetails(DestinationStation.ParentId, this.props.data.Places)
        : DestinationStation;
    const detailedOriginStation =
      OriginStation.Type === "Airport"
        ? this.getDetails(OriginStation.ParentId, this.props.data.Places)
        : OriginStation;

    const DepartureDayDate = format(new Date(DepartureDateTime), "MMM d");
    const DepartureDay = format(new Date(DepartureDateTime), "eee");
    const DepartureTime = format(new Date(DepartureDateTime), "HH:mm a");
    const ArrivalTime = format(new Date(ArrivalDateTime), "HH:mm a");
    const ArrivalDay = format(new Date(ArrivalDateTime), "eee");
    const DurationInHours = this.timeConvert(Duration);
    let layoverInMin;
    let layoverFull;
    console.log(this.props);

    // to fix the bug with 2 or more layovers
    if (DestinationStation.Id !== fullLegDetails.DestinationStation) {
      layoverInMin = differenceInMinutes(
        new Date(fullLegDetails.SegmentsDetails[1].DepartureDateTime),
        new Date(fullLegDetails.SegmentsDetails[0].ArrivalDateTime)
      );
      layoverFull = this.timeConvert(layoverInMin);
      console.log(layoverFull);
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
              {detailedDestinationStation.Name}(
              {detailedDestinationStation.Code})
            </p>
            <p>
              {Carrier.Name} {FlightNumber}
            </p>
            {DestinationStation.Id !== fullLegDetails.DestinationStation ? (
              <>
                <Divider className={classes.divider}/>
                <p>Layover in {detailedDestinationStation.Name}</p>
                <Divider className={classes.divider}/>
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
  }
}

export default withStyles(styles, { withTheme: true })(SegmentDetails);
