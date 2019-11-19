import React from "react";
import format from "date-fns/format";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "12px"
  },
  imgCarrier: {
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
    display: "flex",
    justifyContent: "space-around"
  },
  time: {
    fontWeight: 700
  },
  dot: {
    fontSize: "20px",
    marginTop: "-19px"
  },
  direct: {
    color: theme.palette.primary.main
  }
});

const LegSummery = ({ classes, details }) => {
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
    Arrival,
    Departure,
    CarriersDetails,
    OriginStationDetails,
    DestinationStationDetails,
    Duration,
    StopsDetails
  } = details;

  const durationInHours = timeConvert(Duration);
  const DepartureTime = format(new Date(Departure), "HH:mm");
  const ArrivalTime = format(new Date(Arrival), "HH:mm");

  const stops =
    StopsDetails === "Direct" ? (
      <>
        <hr></hr>
        <span className={classes.direct}>{StopsDetails}</span>
      </>
    ) : (
      <>
        <hr></hr>
        <div className={classes.stops}>
          {StopsDetails.map(stop => (
            <Tooltip
              title={`Layover in ${stop.Name}`}
              placement="bottom"
              key={stop.Code}
            >
              <div>
                <p className={classes.dot}>•</p>
                {stop.Code}{" "}
              </div>
            </Tooltip>
          ))}
        </div>
      </>
    );

  const carriersImages = CarriersDetails.map(carrier => {
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
        <p className={classes.time}>{DepartureTime}</p>
        <p className="station-iata">{OriginStationDetails.Code}</p>
        <p className="bottom station-name">{OriginStationDetails.Name}</p>
      </div>
      <div className={classes.flightDetails}>
        <div className="duraion">{durationInHours}</div>
        <div>{stops}</div>
      </div>
      <div className={classes.legDeatils}>
        <p className={classes.time}>{ArrivalTime}</p>
        <p className="station-iata">{DestinationStationDetails.Code}</p>
        <p className="bottom station-name">{DestinationStationDetails.Name}</p>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LegSummery);
