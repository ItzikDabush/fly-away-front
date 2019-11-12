import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  top: {
      display: "flex",
      justifyContent: 'space-between'
    },
    optionContainer: {
        display: "flex",
        justifyContent: 'space-between',
      alignItems: 'center'
    }
});
class BookingList extends Component {
  render() {
    const { classes } = this.props;
    let bookingOptions = this.props.bookingDetails.map(option => {
      console.log(option);
      console.log(this.props);
      let agent = this.props.agents.find(
        agent => agent.Id === option.Agents[0]
      );
      console.log(agent);

      return (
          <div className={classes.optionContainer}key={option.DeeplinkUrl}>
          <div>
            <img src={agent.ImageUrl} alt={agent.Name} />
          </div>
              <p>{this.props.currency.Symbol}{option.Price.toLocaleString()}</p>
          <div>
            <a href={option.DeeplinkUrl} target="_blank">
              View Deal
            </a>
          </div>
        </div>
      );
    });
    return (
        <div className={classes.root}>
        <div className={classes.top}>
          <div>Booking site</div>
          <div>Price</div>
        </div>
        <div>{bookingOptions}</div>
      </div>
    );
  }
}

export default withStyles(styles)(BookingList);
