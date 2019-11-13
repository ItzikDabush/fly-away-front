import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import sizes from "../sizes";
import axios from "axios";
import format from "date-fns/format";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "12px"
  },
  imgCarrier: {
    display: "flex",

    width: "15%",
    "& img": {
      maxWidth: "100%"
    }
  },
  imgContainer: {
    // width: '40%'
  },
  legDeatils: {
    width: "30%"
  },
  flightDetails: {
    width: " 30%"
  },
  stops: {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'relative',
    top: '-11px'
  }
});

class LegSummery extends Component {
  constructor(props) {
    super(props);
    this.timeConvert = this.timeConvert.bind(this);
  }
  timeConvert(n) {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}m`;
  }

  render() {
    const {
      Arrival,
      Departure,
      CarriersDetails,
      OriginStationDetails,
      DestinationStationDetails,
      Duration,
      StopsDetails
    } = this.props.details;

    const { classes } = this.props;
    const durationInHours = this.timeConvert(Duration);

    const DepartureTime = format(new Date(Departure), "HH:mm");
    const ArrivalTime = format(new Date(Arrival), "HH:mm");

    let stops =
      StopsDetails === "Direct" ? (
        <>
          <hr></hr>
          <span>{StopsDetails}</span>
        </>
      ) : (
        <>
          <hr></hr>
          <div className={classes.stops}>
            {StopsDetails.map(stop => (
              <div key={stop.Code}>
                <p>*</p>
                {stop.Code}{" "}
              </div>
            ))}
          </div>
        </>
      );
    let carriersImages = CarriersDetails.map(carrier => {
      return (
        <div className={classes.imgContainer} key={carrier.Code}>
          <img
            src={carrier.ImageUrl}
            alt={carrier.Name}
            className="carrier-logo"
          />
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <div className={classes.imgCarrier}>{carriersImages}</div>
        <div className={classes.legDeatils}>
          <p className="time">{DepartureTime}</p>
          <p className="station-iata">{OriginStationDetails.Code}</p>
          <p className="bottom station-name">{OriginStationDetails.Name}</p>
        </div>
        <div className={classes.flightDetails}>
          <div className="duraion">{durationInHours}</div>

          <div>{stops}</div>
        </div>
        <div className={classes.legDeatils}>
          <p className="time">{ArrivalTime}</p>
          <p className="station-iata">{DestinationStationDetails.Code}</p>
          <p className="bottom station-name">
            {DestinationStationDetails.Name}
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LegSummery);
