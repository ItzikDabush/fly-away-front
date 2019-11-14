import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { serverUrl } from "../config";

let options = [];
const styles = theme => ({
  root: {
    boxShadow: "none",
    borderColor: "none",
    width: "50%",
    transition: "width 2s"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

const filterOptions = inputValue => {
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};
const promiseOptions = inputValue =>
  axios
    .post(`${serverUrl}/getAirport`, {
      data: {
        originByIP: inputValue
      }
    })
    .then(re => {
      // console.log(re.data.Places)
      options = re.data.Places.map(place => {
        place.value = place.PlaceId;
        place.label = place.PlaceName;
        return place;
      });

      return filterOptions(inputValue);
    });

class InputField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.handleCityChoose(value, this.props.name);
  }
  render() {
    const { classes } = this.props;
  
    return (
      <AsyncSelect
        color="primary"
        
        className={classes.root}
        placeholder={this.props.placeholder}
        cacheOptions
        autoFocus={this.props.autoFocus}
        loadOptions={promiseOptions}
        onChange={this.handleChange}
      />
    );
  }
}

export default withStyles(styles)(InputField);
