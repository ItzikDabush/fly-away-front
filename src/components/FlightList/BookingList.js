import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

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
     
     
      let agent = this.props.agents.find(
        agent => agent.Id === option.Agents[0]
      );
    

      return (
          <div className={classes.optionContainer}key={option.DeeplinkUrl}>
          <div>
            <img src={agent.ImageUrl} alt={agent.Name} />
          </div>
              <p>{this.props.currency.Symbol}{Math.round(option.Price).toLocaleString()}</p>
          <div>
          <Button href={option.DeeplinkUrl} target="_blank" variant="contained" color="secondary" className={classes.button}>
View Deal      </Button>
          
           
          </div>
        </div>
      );
    });
    return (
        <div className={classes.root}>
        {/* <div className={classes.top}>
          <div>Booking site</div>
          <div>Price</div>
        </div> */}
        <div>{bookingOptions}</div>
      </div>
    );
  }
}

export default withStyles(styles)(BookingList);