import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LegDetails from "./LegDetails";
import Bookinglist from "./BookingList";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

export class DetailsTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };

    this.a11yProps = this.a11yProps.bind(this);
  }

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Flight Details" {...this.a11yProps(0)} />
          <Tab label="Prices" {...this.a11yProps(1)} />
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          <LegDetails
            data={this.props.data}
            name="Outbound"
            legDetails={this.props.outbound.outboundDetails}
          />

          {this.props.inbound ? (
            <LegDetails
              data={this.props.data}
              name="Inbound"
              legDetails={this.props.inbound.inboundDetails}
            />
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <Bookinglist
            currency={this.props.data.Currencies[0]}
            agents={this.props.data.Agents}
            bookingDetails={this.props.itineraryDetails.PricingOptions}
          />
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles)(DetailsTabs);
