import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  top: {
    display: "flex",
    justifyContent: "space-between"
  },
  optionContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  imageContainer: {
    maxWidth: "100px",
    "& img": {
      maxWidth: '100%',
      margin: "12px 0"
    }
  }
});

const BookingList = ({ classes, agents, bookingDetails, currency }) => {
  let bookingOptions = bookingDetails.map((option, index, arr) => {
    let agent = agents.find(agent => agent.Id === option.Agents[0]);
    return (
      <div key={option.DeeplinkUrl}>
        <div className={classes.optionContainer}>
          <div className={classes.imageContainer}>
            <img src={agent.ImageUrl} alt={agent.Name} />
          </div>
          <p>
            {currency.Symbol}
            {Math.round(option.Price).toLocaleString()}
          </p>
          <div>
            <Button
              href={option.DeeplinkUrl}
              target="_blank"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              View Deal
            </Button>
          </div>
        </div>
        {index !== arr.length - 1 ? <Divider /> : ""}
      </div>
    );
  });

  return (
    <div className={classes.root}>
      <div>{bookingOptions}</div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(BookingList);
