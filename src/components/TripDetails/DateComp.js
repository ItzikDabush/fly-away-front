import "date-fns";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import sizes from "../sizes";

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
      width: "40%"
    }
  },
  datePickerDialogMine: {
    [sizes.minWidth("md")]: {
      display: "none"
    },
    width: "40%",
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
    },
    '.MuiIconButton-root': {
      padding: 0
    }
  }
});

class DateComp extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date() };
  }

  setSelectedDate = date => {
    this.setState({ selectedDate: date });
  };

  handleDateChange = (fullDate, formatedDate) => {
    let newInboundedate = null;
    if (this.props.name === "outboundDate") {
      newInboundedate = format(addDays(fullDate, 5), "yyyy-MM-dd");
    }
    this.setSelectedDate(fullDate);
    this.props.handleChoose(formatedDate, this.props.name, newInboundedate);
  };

  render() {
    const { classes, notExpend, minDate, initialDate } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.all}>
        <KeyboardDatePicker
          disablePast
          className={classes.datePickerInline}
          autoOk
          disableToolbar
          disabled={notExpend}
          variant="inline"
          id="date-picker-inline"
          format="yyyy-MM-dd"
          value={initialDate || this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          
          onAccept={e => {
            console.log(e);
          }}
        />
        <KeyboardDatePicker
          className={classes.datePickerDialogMine}
          color="primary"
          disabled={notExpend}
          disablePast
          minDate={minDate}
          autoOk
          id="date-picker-dialog"
          format="yyyy-MM-dd"
          value={initialDate || this.state.selectedDate}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
export default withStyles(styles, { withTheme: true })(DateComp);
