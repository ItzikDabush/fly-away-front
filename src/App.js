import React, { Component } from "react";
import axios from "axios";
import TripDetails from "./components/TripDetails/TripDetails";
import FlightListMaterial from "./components/FlightList/FlightListMaterial";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import seedOffers from "./seedOffers"; //delete on live
import { withStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import ContainerPage from "./components/ContainerPage";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#365954",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#27b8a3"
    }
  }
});
const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitePrefernces: {
        country: "IL",
        currency: "USD"
      },
      tripToSearch: {
        oneWay: false
      },
      resultsForTrip: "",
      isFetching: false
    };

    this.getOffers = this.getOffers.bind(this);
  }
  // to return on deploment
  componentDidMount() {
    axios.get("https://fly-a-way.herokuapp.com/").then(response => {
      console.log(response);
      this.setState({
        sitePrefernces: {
          country: response.data.country_code,
          currency: response.data.currency.code,
          cityByIp: response.data.region,
          locale: `en-${response.data.country_code}`,
          flag: response.data.emoji_flag
        }
      });
    });
  }

  //Create session with Skyscanner after the Use choose his prefrences
  getOffers(data) {
    // console.log(data);
    this.setState(
      {
        isFetching: true,
        tripToSearch: { ...data }
      },
      () => {
        axios
          .post("https://fly-a-way.herokuapp.com/data", {
            data: {
              //sitePrefernces
              country: this.state.sitePrefernces.country,
              currency: this.state.sitePrefernces.currency,
              locale: this.state.sitePrefernces.locale,
              //tripToSearch - required to open session
              originPlace: this.state.tripToSearch.originPlace.PlaceId,
              destinationPlace: this.state.tripToSearch.destinationPlace
                .PlaceId,
              outboundDate: this.state.tripToSearch.outboundDate,
              adults: this.state.tripToSearch.adults,
              //tripToSearch - optinal to open session
              inboundDate: this.state.tripToSearch.oneWay
                ? ""
                : this.state.tripToSearch.inboundDate,
              children: this.state.tripToSearch.children,
              infants: this.state.tripToSearch.infants,

              ...(this.state.tripToSearch.directOnly ? { stops: 0 } : {})
            }
          })
          .then(res => {
            this.setState({ resultsForTrip: res.data, isFetching: false });
          });
      }
    );
  }

  handleSitePrefernces = prefernces => {
    console.log(prefernces);
    this.setState({
      sitePrefernces: { ...this.state.sitePrefernces, currency: prefernces }
    });
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header sitePrefernces={this.handleSitePrefernces} />
          <TripDetails
            cityByIp={this.state.sitePrefernces.cityByIp}
            getOffers={this.getOffers}
          />
          {this.state.resultsForTrip ? (
            <FlightListMaterial results={this.state.resultsForTrip} />
          ) : (
            <ContainerPage isFetching={this.state.isFetching} />
          )}
          <Footer location={this.state.sitePrefernces.flag} />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
