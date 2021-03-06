import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CityCard from "./CityCard";
import cityData from "./CardData";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "10px"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const CityList = ({ getOffers, cityByIp }) => {
  const classes = useStyles();
  const handleOffers = data => {
    getOffers(data);
  };
  const cards = cityData.map(item => {
    return (
      <Grid key={item.name} item xs={6} sm={6} md={4}>
        <CityCard
          originByIp={cityByIp}
          getOffers={handleOffers}
          name={item.name}
          country={item.country}
          img={item.image}
          placeId={item.PlaceId}
        />
      </Grid>
    );
  });

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      justify="space-around"
      alignItems="center"
    >
      {cards}
    </Grid>
  );
};

export default CityList;
