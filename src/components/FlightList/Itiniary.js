import React, { Component } from "react";
import LegSummery from "./LegSummery";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%"
  },
  legsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }
});

class Itiniary extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {

    const { classes, carriers, lowestPrice, outbound, inbound } = this.props;
    console.log(inbound)
    return (
      <div className={classes.root}>
       <div>
           <p className={classes.itiniaryCarriers}>{carriers}</p>
           <p> Starting from: {this.props.data.Currencies[0].Symbol}{lowestPrice} </p>

         </div>
        <div className={classes.legsContainer}>
           <LegSummery name='outbound' details={outbound.outboundDetails}/>
         { inbound ? <LegSummery name='inbound' details={inbound.inboundDetails}/> : ''}
           
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Itiniary);
