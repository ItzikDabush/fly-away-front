import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import InputField from "./InputField";
import DateComp from "./DateComp";

const styles = theme => console.log(theme) || ({
  root: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",

    padding: "0 30px"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  switch: {
    width: "100%",
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    width: '100%',
    margin: '10px 0',
    color: 'white'
  },
  containedItzik: {
       boxShadow: 'none'
  }
});

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

  //Set the Select inputvalu to be the originPlace/destinationPlace
  handleChoose(chosen, identeifier) {
    this.setState({ [identeifier]: chosen });
  }

  handleClick(e) {
    e.preventDefault();

    this.props.getOffers(this.state);
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.checked,
      inboundDate: ""
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
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
          <div className={classes.switch}>
            <FormControlLabel
              control={
                <Switch
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

          <InputField
            handleCityChoose={this.handleChoose}
            placeholder="To"
            name="destinationPlace"
          />
          <>
            {this.state.oneWay ? (
              ""
            ) : (
              <DateComp
                name="inboundDate"
                handleChoose={this.handleChoose}
                label="Return"
                initialDate={this.state.inboundDate}
                minDate={this.state.outboundDate}
              />
            )}
          </>
          <Button
            disabled={
              this.state.originPlace && this.state.destinationPlace
                ? false
                : true
            }
            color="secondary"
            variant="contained"
            classes={{
    // class name, e.g. `classes-nesting-root-x`
    contained: classes.containedItzik, // class name, e.g. `classes-nesting-label-x`
  }}
            className={classes.button}
            onClick={this.handleClick}
          >
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TripDetails);
