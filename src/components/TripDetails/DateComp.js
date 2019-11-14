import "date-fns";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import sizes from "../sizes";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    height: 48,
    padding: "0 30px"
  },
  datePickerInline: {
    display: "none",
    [sizes.minWidth("md")]: {
      display: "initial",
      width: "100%"
    }
  },
  datePickerDialogMine: {
    [sizes.minWidth("md")]: {
      display: "none"
    },
    width: "40%",
    // display: props => (props.notExpend === true ? "none" : "initial"),
    transition: "display 2s ease 2s"
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
  all: {}
});

class DateComp extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  setSelectedDate(date) {
    this.setState({ selectedDate: date });
  }

  handleDateChange = (date, other) => {
    console.log(date, other, this.props.name);
    let newInboundedate = null;
    if (this.props.name === "outboundDate") {
      newInboundedate = format(addDays(date, 5), "yyyy-MM-dd");
    }
    this.setSelectedDate(date);
    this.props.handleChoose(other, this.props.name, newInboundedate);
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.all}>
        {/* <KeyboardDatePicker
          disablePast
          className={classes.datePickerInline}
          autoOk
          disableToolbar
          variant="inline"
          margin="normal"
          id="date-picker-inline"
          label={this.props.label}
          format="yyyy-MM-dd"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          initialFocusedDate={this.props.initialFocusedDate}
          onAccept={e => {
            console.log(e);
          }}
        /> */}
        <KeyboardDatePicker
          className={classes.datePickerDialogMine}
          input={
            <Input
              classes={{
                underline: classes.underline
              }}
            />
          }
          color="primary"
          disabled={this.props.notExpend}
          disablePast
          minDate={this.props.minDate && this.props.minDate}
          autoOk
          id="date-picker-dialog"
          format="yyyy-MM-dd"
          value={this.props.initialDate || this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
export default withStyles(styles)(DateComp);
