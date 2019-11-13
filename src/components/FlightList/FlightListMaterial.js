import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailsTabs from "./DetailsTabs";
import Itiniary from "./Itiniary";

const styles = theme =>
  console.log(theme) || {
    root: {
      backgroundColor: theme.palette.primary.light,
      marginBottom: '0.3rem',
      color: 'black'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "100%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  };

class FlightListMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.getDetailsOfLeg = this.getDetailsOfLeg.bind(this);
  }
  getDetails(id, detailsOf) {
    return detailsOf.find(detailedElement => detailedElement.Id === id);
  }

  getDetailsOfLeg(legId) {

    const { Legs, Carriers, Places, Segments, Agents } = this.props.results;
    let LegDetails = this.getDetails(legId, Legs);

    LegDetails.CarriersDetails = LegDetails.Carriers.map(id => {
      return this.getDetails(id, Carriers);
    });

    LegDetails.DestinationStationDetails = this.getDetails(
      LegDetails.DestinationStation,
      Places
    );

    LegDetails.OriginStationDetails = this.getDetails(
      LegDetails.OriginStation,
      Places
    );

    LegDetails.StopsDetails =
      LegDetails.Stops.length === 0
        ? "Direct"
        : LegDetails.Stops.map(stop => {
            return this.getDetails(stop, Places);
          });

    LegDetails.SegmentsDetails = LegDetails.SegmentIds.map(id => {
      return this.getDetails(id, Segments);
    });
    return LegDetails;
  }
  handleChange = panel => (event, isExpanded) => {
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false });
  };

  render() {
    const { classes } = this.props;
    const { Itineraries } = this.props.results;

    let itineraries = Itineraries.map((itin, index) => {
      let outboundDetails = this.getDetailsOfLeg(itin.OutboundLegId);
      let carriersOutbound = outboundDetails.CarriersDetails.map(carrier => {
        return carrier.Name;
      });

      let outbound = {
        outboundDetails: outboundDetails,
        carriersOutbound: carriersOutbound
      };

      let inbound = null;
    
      let carriersInbound = [];
      if (itin.InboundLegId) {
        console.log("inside if");
        let inboundDetails = this.getDetailsOfLeg(itin.InboundLegId);
        let carriersInbound = inboundDetails.CarriersDetails.map(carrier => {
          return carrier.Name;
        });

        inbound = {
          inboundDetails: inboundDetails,
          carriersInbound: carriersInbound
        };
      }
    

      let carriers = Array.from(
        new Set(carriersInbound.concat(carriersOutbound))
      ).join(", ");

      let lowestPrice = Math.min.apply(
        Math,
        itin.PricingOptions.map(o => o.Price)
      );

      return (
        <ExpansionPanel
          color="primary"
          className={classes.root}
          TransitionProps={{ unmountOnExit: true }}
          key={index}
          expanded={this.state.expanded === `panel${index}`}
          onChange={this.handleChange(`panel${index}`)}
        >
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Itiniary
              carriers={carriers}
              lowestPrice={lowestPrice}
              itineraryDetails={itin}
              outbound={outbound}
              {...(inbound !== null ? (inbound = { inbound }) : "")}
              data={this.props.results}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <DetailsTabs
              carriers={carriers}
              lowestPrice={lowestPrice}
              itineraryDetails={itin}
              outbound={outbound}
              {...(inbound !== null ? { ...inbound } : "")}
              data={this.props.results}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });

    return <div className={classes.rooty}>{itineraries}</div>;
  }
}
export default withStyles(styles, { withTheme: true })(FlightListMaterial);
