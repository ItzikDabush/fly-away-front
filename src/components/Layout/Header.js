import React, { Component, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


import currencyList from "./CurrencyList";
import FlightIcon from "@material-ui/icons/Flight";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    marginBottom: "10px",
    padding: "0px 30px",
    display: "flex",
    justifyContent: "space-between",
    "& svg": {
      color: "white"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    color: "white"
  },

  inputLabel: {
    color: "white"
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  logeText: {
    fontSize: '0.8rem'
  },
  underline: {
    "&:hover": {
      borderBottom: "1px solid white"
    },
    "&:before": {
      borderBottom: "1px solid white"
    },
    "&:after": {
      borderBottom: "1px solid white"
    }
  },
  menuItem: {
    fontSize: "0.8rem"
  },
  inputSelectedValue: {
    fontSize: "0.8rem"
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD"
    };
  }

  componentDidMount() {}

  handleChange = event => {
    this.setState({ currency: event.target.value });
    this.props.sitePrefernces(event.target.value);
  };

  onSelectFlag = countryCode => {
    console.log(countryCode);
  };
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  render() {
    console.log(this.props);
    const { classes } = this.props;
    const menuItems = Object.values(currencyList).map(curr => {
      // console.log(curr)
      return (
        <MenuItem
          color="primary"
          className={classes.menuItem}
          key={curr.code}
          value={curr.code}
        >
          {curr.code} - {curr.symbol} -{curr.name}
        </MenuItem>
      );
    });
    return (
      <header className={this.props.classes.root}>
        <div className={classes.logo}>
          <FlightIcon fontSize="small" />
          <p className={classes.logeText}>Fly Away</p>
        </div>

        <FormControl className={this.props.classes.formControl} color="primary">
          <InputLabel
            color="primary"
            className={this.props.classes.inputLabel}
            id="demo-simple-select-label"
          >
            Display Results In
          </InputLabel>
          <Select
            color="primary"
            input={
              <Input
                classes={{
                  underline: classes.underline,
                  root: classes.inputSelectedValue
                }}
              />
            }
            className={classes.select}
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.currency}
            onChange={this.handleChange}
          >
            {menuItems}
          </Select>
        </FormControl>
      </header>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
