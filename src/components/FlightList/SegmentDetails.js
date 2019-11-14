import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import differenceInMinutes from "date-fns/differenceInMinutes";

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
    }
  },
  rightCol: {
    width: "20%",
    textAlign: "right"
  },
  details: {
    width: "100%"
  }
});

class SegmentDetails extends Component {
  timeConvert(n) {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  }
  getDetails(id, detailsOf) {
    // console.log(detailsOf)
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
      OperatingCarrier,
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
  
    if (DestinationStation.Id !== fullLegDetails.DestinationStation) {
      layoverInMin = differenceInMinutes(
        new Date(fullLegDetails.SegmentsDetails[1].DepartureDateTime),
        new Date(fullLegDetails.SegmentsDetails[0].ArrivalDateTime)
      );
      layoverFull = this.timeConvert(layoverInMin);
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
              <p>
                Layover in {detailedDestinationStation.Name} for {layoverFull}
              </p>
            ) : (
              ""
            )}
            <p></p>
          </div>
        </div>
        <div className={classes.rightCol}>{DurationInHours}</div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SegmentDetails);
