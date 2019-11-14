import React, { Component } from "react";
import axios from "axios";
import TripDetails from "./components/TripDetails/TripDetails";
import FlightListMaterial from "./components/FlightList/FlightListMaterial";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import seedOffers from "./seedOffers"; //delete on live
import { withStyles } from "@material-ui/core/styles";
import ContainerPage from "./components/Layout/ContainerPage";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { serverUrl } from "./components/config";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#64B5F6", contrastText: "#455a64" },

    secondary: { main: "#BBDEFB", contrastText: "#455a64" }
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
      resultsForTrip: seedOffers,
      isFetching: false
    };

    this.getOffers = this.getOffers.bind(this);
  }
  // to return on deploment
  componentDidMount() {
    axios
      .get("http://ip-api.com/json/")
      .then(response => {
        console.log(response);
        this.setState({
          sitePrefernces: {
            ...this.state.sitePrefernces,
            country: response.data.countryCode,
            cityByIp: response.data.regionName,
            locale: `en-${response.data.countryCode}`
          }
        });
      }).then(() => {
        axios
          .post(`${serverUrl}/getAirport`, {
            data: {
              originByIP: this.state.sitePrefernces.cityByIp
            }
          }).then(response => {
            this.setState({
              sitePrefernces: {
                ...this.state.sitePrefernces,
                cityBySkyscanner: response.data.Places[0].PlaceId,
              }
            })
              
          }).catch(err => {
            console.log(err)
          });
      })
  }

  //Create session with Skyscanner after the Use choose his prefrences
  getOffers(data) {
    console.log(data);
    this.setState(
      { resultsForTrip: "", isFetching: true, tripToSearch: { ...data } },
      () => {
        axios
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
          .then(res => {
            this.setState({ resultsForTrip: res.data, isFetching: false });
          })
          .catch(err => {
            console.log(err);
            this.setState({ errorFetching: true });
          });
      }
    );
  }

  handleSitePrefernces = prefernces => {
   
    this.setState({
      sitePrefernces: { ...this.state.sitePrefernces, currency: prefernces }
    });
   
  };

  render() {
   
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header sitePrefernces={this.handleSitePrefernces} />
          <TripDetails
            getOffers={this.getOffers}
          />
          {this.state.resultsForTrip.Itineraries ? (
            <FlightListMaterial results={this.state.resultsForTrip} />
          ) : (
            <ContainerPage
              cityByIp={this.state.sitePrefernces.cityBySkyscanner}
              isFetching={this.state.isFetching}
              getOffers={this.getOffers}
            />
          )}
          <Footer location={this.state.sitePrefernces.flag} />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
