import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CityCard from "./CityCard";
import cityData from "./CardData";
import Grid from "@material-ui/core/Grid";

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

export default function CityList(props) {
  const classes = useStyles();

  const handleOffers = data => {
    
    props.getOffers(data);
  };
  const cards = cityData.map(item => {
    return (
      <Grid key={item.name} item xs={6} sm={5}>
        <CityCard
          originByIp={props.cityByIp}
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
    <Grid container className={classes.root} spacing={2}>
      {cards}
    </Grid>
  );
}
