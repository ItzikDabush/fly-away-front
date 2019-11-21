import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailsTabs from "./DetailsTabs";
import Itiniary from "./Itiniary";
import { getDetailsOfLeg } from '../helpers'

const styles = theme => ({
    root: {
      backgroundColor: "white",
      color: theme.palette.secondary.contrastText
    },
  });

class FlightListMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
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
      let outboundDetails = getDetailsOfLeg(itin.OutboundLegId, this.props.results);
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
        let inboundDetails = getDetailsOfLeg(itin.InboundLegId, this.props.results);
        carriersInbound = inboundDetails.CarriersDetails.map(carrier => {
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
   
      let lowestPrice = Math.round(
        Math.min.apply(
          Math,
          itin.PricingOptions.map(o => o.Price)
        )
      ).toLocaleString();

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
            expandIcon={<ExpandMoreIcon color='primary' className={classes.expandIcon}/>}
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
          <Divider />
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

    return <div className={classes.root}>{itineraries}</div>;
  }
}
export default withStyles(styles, { withTheme: true })(FlightListMaterial);
