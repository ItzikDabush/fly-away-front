import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    alignItems: "center"
  }
});


const BookingList = props => {
  const { classes, agents, bookingDetails, currency } = props;
  let bookingOptions = bookingDetails.map(option => {
    let agent = agents.find(agent => agent.Id === option.Agents[0]);
    return (
      <div className={classes.optionContainer} key={option.DeeplinkUrl}>
        <div>
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
    );
  });

  return (
    <div className={classes.root}>
      <div>{bookingOptions}</div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(BookingList);
