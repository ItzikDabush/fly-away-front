import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SegmentDetails from "./SegmentDetails";


const styles = theme => ({
  root: {
    width: "100%",
    // background: theme.palette.secondary.light,
    color: 'inherit',
    fontSize: '0.8rem',
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,
    textAlign: 'end',
    marginBottom: '10px',
  },
  col: {
    width: "20%"
  },
  duration: {
    textAlign: "right"
  },
  segments: {
    fontSize: '0.7rem'
  }
});

export class LegDetails extends Component {
  constructor(props) {
    super(props);
    this.timeConvert = this.timeConvert.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  getDetails(id, detailsOf) {

    return detailsOf.find(detailedElement => detailedElement.Id === id);
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
    let {
      Directionality,
      OriginStationDetails,
      DestinationStationDetails,
      Duration
    } = this.props.legDetails;

    let newDuration = this.timeConvert(Duration);
    const { classes } = this.props;

    let segments = this.props.legDetails.SegmentsDetails.map(segment => {
      let relevantDataDetailes = {
        ...segment,
        Carrier: this.getDetails(segment.Carrier, this.props.data.Carriers),
        OperatingCarrier: this.getDetails(
          segment.OperatingCarrier,
          this.props.data.Carriers
        ),
        DestinationStation: this.getDetails(
          segment.DestinationStation,
          this.props.data.Places
        ),
        OriginStation: this.getDetails(
          segment.OriginStation,
          this.props.data.Places
        )
      };

      return (
        <SegmentDetails
          data={this.props.data}
          key={segment.Id}
          {...relevantDataDetailes}
          fullLegDetails={this.props.legDetails}
        />
      );
    });

    return (
      <div className={classes.root}>
        <div className={this.props.classes.top}>
          <div className={`${classes.col} ${classes.directionality}`}>
            {Directionality}
          </div>
          <div className={`${classes.col} ${classes.destinations}`}>
            {OriginStationDetails.Code} - {DestinationStationDetails.Code}
          </div>
          <div className={`${classes.col} ${classes.duration}`}>{newDuration}</div>
        </div>
        <div className={classes.segments}>{segments}</div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LegDetails);
