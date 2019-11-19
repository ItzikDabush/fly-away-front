import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LegDetails from "./LegDetails";
import Bookinglist from "./BookingList";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  divider: {
    margin: '10px 0'
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

class DetailsTabs extends Component {
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
    const { classes, data, outbound, inbound, itineraryDetails } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Flight Details" {...this.a11yProps(0)} />
          <Tab label="Prices" {...this.a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LegDetails
            data={data}
            name="Outbound"
            legDetails={outbound.outboundDetails}
          />
          {inbound ? (
            <>
              <Divider className={classes.divider}/>
              <LegDetails
                data={data}
                name="Inbound"
                legDetails={inbound.inboundDetails}
              />
            </>
          ) : (
            ""
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Bookinglist
            currency={data.Currencies[0]}
            agents={data.Agents}
            bookingDetails={itineraryDetails.PricingOptions}
          />
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailsTabs);
