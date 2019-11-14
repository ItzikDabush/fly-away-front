import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import InputField from "./InputField";
import DateComp from "./DateComp";
import Paper from "@material-ui/core/Paper";

const styles = theme =>
  console.log(theme) || {
    root: {
      background: theme.palette.secondary.dark,
      border: 0,
      // borderRadius: 3,
      // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: theme.palette.primary.contrastText,
      zIndex: 100,
      padding: "20px 30px",
      marginTop: "50px"
    },

    DateAndDestinationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: `1px solid ${theme.palette.secondary.light}`,
      background: theme.palette.secondary.main,
      padding: "10px",
      borderRadius: "5px"
    },

    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    },
    switch: {
      marginTop: '10px',
      width: "100%",
      display: "flex",
      justifyContent: "center",
      fontSize: '0.8rem'
    },
    button: {
      width: "100%",
      margin: "10px 0"
    },
    containedItzik: {
      boxShadow: "none"
    },
    expend: {
      display: "initial",
      transition: "display 2s"
    },
    notExpend: {
      display: "none",
      transition: "display 2s"
    }
  };

class TripDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originPlace: null,
      destinationPlace: null,
      outboundDate: format(new Date(), "yyyy-MM-dd"),
      adults: 1,
      inboundDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
      children: 0,
      infants: 0,
      directOnly: false,
      oneWay: false,
      sortType: "price"
    };
    this.handleChoose = this.handleChoose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //Set the Select inputvalu to be the outboundDate/inboundDate
  // if the identifier id outboundate then set the inbounde date to 5 days ahead - affect on the current value
  handleChoose(chosen, identeifier, newInboundedate) {
    console.log(chosen, identeifier, newInboundedate);
    this.setState({
      [identeifier]: chosen,
      ...(newInboundedate && { inboundDate: newInboundedate })
    });
  }

  handleClick(e) {
    e.preventDefault();

    this.props.getOffers(this.state);
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.checked
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={10} square>
        <form>
          <Typography variant="caption" display="block" gutterBottom>
            From
          </Typography>
          <div className={classes.DateAndDestinationContainer}>
            <InputField
              autoFocus={"true"}
              handleCityChoose={this.handleChoose}
              placeholder="From"
              name="originPlace"
            />

            <DateComp
              name="outboundDate"
              handleChoose={this.handleChoose}
              label="Depart"
            />
          </div>
          <div>
            <div className={classes.switch}>
              <FormControlLabel
                control={
                  <Switch
                  size="small"
                    color="secondary"
                    checked={this.state.oneWay}
                    onChange={this.handleChange("oneWay")}
                    value="oneWay"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="One Way"
              />
              <FormControlLabel
                control={
                  <Switch
                  size="small"
                    color="secondary"
                    checked={this.state.directOnly}
                    onChange={this.handleChange("directOnly")}
                    value="directOnly"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
                label="Direct Only"
              />
            </div>
          </div>

          <div>
            <Typography variant="caption" display="block" gutterBottom>
              To
            </Typography>
            <div className={classes.DateAndDestinationContainer}>
              <InputField
                handleCityChoose={this.handleChoose}
                placeholder="To"
                name="destinationPlace"
                isExpend={this.state.oneWay}
              />
              <DateComp
                notExpend={this.state.oneWay}
                name="inboundDate"
                handleChoose={this.handleChoose}
                label="Return"
                initialDate={this.state.inboundDate}
                minDate={this.state.outboundDate}
              />
            </div>
          </div>

          <Button
            disabled={
              this.state.originPlace && this.state.destinationPlace
                ? false
                : true
            }
            color="primary"
            variant="contained"
            classes={{
              // class name, e.g. `classes-nesting-root-x`
              contained: classes.containedItzik // class name, e.g. `classes-nesting-label-x`
            }}
            className={classes.button}
            onClick={this.handleClick}
          >
            Search
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TripDetails);
