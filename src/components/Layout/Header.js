import React, { Component, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import currencyList from "./CurrencyList";
import FlightIcon from "@material-ui/icons/Flight";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  // root: {
  //   background: theme.palette.primary.main,
  //   border: 0,

  //   marginBottom: "10px",
  //   padding: "0px 30px",
  //   display: "flex",
  //   justifyContent: "space-between",

  // },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 180
  // },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },

  // logo: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  // logeText: {
  //   fontSize: '0.8rem'
  // },

  // menuItem: {
  //   fontSize: "0.8rem"
  // },
  // inputSelectedValue: {
  //   fontSize: "0.8rem"
  // }
  "@global": {
    ".MuiInput-underline:before": {
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`
    },
    ".MuiInputBase-root": {
      color: "inherit"
    },
    ".MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: `2px solid ${theme.palette.primary.contrastText}`
    }
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD"
    };
  }

  componentDidMount() {
    this.props.sitePrefernces(this.state.currency);
  }

  handleChange = event => {
    this.setState({ currency: event.target.value });
    this.props.sitePrefernces(event.target.value);
  };


  render() {
    console.log(this.props);
    const { classes } = this.props;
    const menuItems = Object.values(currencyList).map(curr => {
      // console.log(curr)
      return (
        <MenuItem
          className={classes.menuItem}
          key={curr.code}
          value={curr.code}
        >
          {curr.code} - {curr.symbol} 
        </MenuItem>
      );
    });
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            href='/'
          >
            <FlightIcon fontSize="small"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fly Away
          </Typography>
          <FormControl className={this.props.classes.formControl}>
            {/* <InputLabel
              className={this.props.classes.inputLabel}
              id="demo-simple-select-label"
            >
              Display Results In
            </InputLabel> */}
            <Select
            disableUnderline
              color="inherit"
              className={classes.select}
              labelid="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.currency}
              onChange={this.handleChange}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      /* <header className={classes.root}>
        <div className={classes.logo}>
          <FlightIcon fontSize="small" />
          <p className={classes.logeText}>Fly Away</p>
        </div>

        <FormControl className={this.props.classes.formControl} >
          <InputLabel
            
            className={this.props.classes.inputLabel}
            id="demo-simple-select-label"
          >
            Display Results In
          </InputLabel>
          <Select
           
           
            className={classes.select}
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.currency}
            onChange={this.handleChange}
          >
            {menuItems}
          </Select>
        </FormControl>
      </header> */
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
