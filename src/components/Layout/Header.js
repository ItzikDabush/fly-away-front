import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FlightIcon from "@material-ui/icons/Flight";

import currencyList from "./CurrencyList";

const styles = theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
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
    flexGrow: 1,
    fontStyle: "italic"
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
    this.props.handleCurrencyChange(this.state.currency);
  }

  handleChange = event => {
    this.setState({ currency: event.target.value });
    this.props.handleCurrencyChange(event.target.value);
  };

  render() {
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
            href="/"
          >
            <FlightIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Fly Away
          </Typography>
          <FormControl className={classes.formControl}>
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
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
