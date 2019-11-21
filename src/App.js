import React, { Component } from "react";
import axios from "axios";
import TripDetails from "./components/TripDetails/TripDetails";
import FlightListMaterial from "./components/FlightList/FlightListMaterial";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import ContainerPage from "./components/Layout/ContainerPage";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { serverUrl } from "./components/config";

//defing a default theme for the app
const theme = createMuiTheme({
  palette: {
    primary: { main: "#64B5F6", contrastText: "#455a64" },
    secondary: { main: "#BBDEFB", contrastText: "#455a64" }
  }
});

const styles = theme => ({
  root: {
    width: "100%",
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    //the main state of the application is centrelized here
    this.state = {
      sitePrefernces: {
        country: "IL"
      },
      tripToSearch: {
        oneWay: false
      },
      resultsForTrip: '',
      isFetching: false
    };

    this.getOffers = this.getOffers.bind(this);
  }

  componentDidMount() {
    //fetching the user location
    axios
      .get("http://ip-api.com/json/")
      .then(response => {
        this.setState({
          //get location data of the user
          sitePrefernces: {
            ...this.state.sitePrefernces,
            country: response.data.countryCode,
            cityByIp: response.data.regionName,
            locale: `en-${response.data.countryCode}`
          }
        });
      })
      .then(() => {
        axios
          .post(`${serverUrl}/getAirport`, {
            //get relevant airport from skyscanner
            data: {
              originByIP: this.state.sitePrefernces.cityByIp
            }
          })
          .then(response => {
            this.setState({
              sitePrefernces: {
                ...this.state.sitePrefernces,
                cityBySkyscanner: response.data.Places[0].PlaceId
              }
            });
          })
          .catch(err => {
            this.setState({ errorFetching: true, isFetching: false });
            console.log(err);
          });
      });
  }




  getOffers(data) {
    this.setState(
      { resultsForTrip: "", isFetching: true, tripToSearch: { ...data } }, //refactor? send the data object insted of the the state?.
      () => {
        axios //
          .post(`${serverUrl}/data`, {
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
          .then( res => {
            this.setState({ resultsForTrip: res.data, isFetching: false });
          })
          .catch(err => {
            console.log(err);
            this.setState({ errorFetching: true, isFetching: false });
          });
      }
    );
  }

  handleCurrencyChange = currency => {
    this.setState({
      sitePrefernces: { ...this.state.sitePrefernces, currency: currency }
    });
  };

  render() {
    const { classes } = this.props;
    const { sitePrefernces, resultsForTrip, isFetching } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header handleCurrencyChange={this.handleCurrencyChange} />
          <TripDetails getOffers={this.getOffers} cityByIp={sitePrefernces.cityByIp} cityBySkyscanner={sitePrefernces.cityBySkyscanner}/>
          {/* // refactor  -  indicate that there are no itineries for the trip - such case is identified as "this.state.resultsForTrip.Itineraries" will be equal to an empty array */}
          {resultsForTrip.Itineraries ? (
            <FlightListMaterial results={resultsForTrip} />
          ) : (
            <ContainerPage
              cityByIp={sitePrefernces.cityBySkyscanner}
              isFetching={isFetching}
              getOffers={this.getOffers}
            />
          )}
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
