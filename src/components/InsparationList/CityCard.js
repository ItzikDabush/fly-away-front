import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import endOfWeek from "date-fns/endOfWeek";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

const useStyles = makeStyles({
  card: {
    maxWidth: '100%'
  },
  media: {
    height: 100
  },
  content: {
    padding: "5px 8px 5px 11px"
  },
  actions: {
    padding: "0 8px 0 6px"
  },
  caption: {
    padding: " 0 16px 5px 12px"
  }
});

function CityCard({ placeId, originByIp, name, img, country, getOffers }) {
  const classes = useStyles();

  function getDatesForInspirations() {
    // Refactor ? maybe an outside function? class?
    let date = new Date();
    let dateDetails = {};
    const weekendStart = endOfWeek(date, { weekStartsOn: 6 }); //hack to get friday
    const weekendEnd = addDays(weekendStart, 3);
    const weekendStartFormated = format(weekendStart, "yyyy-MM-dd");
    const weekendEndFormated = format(weekendEnd, "yyyy-MM-dd");
    const outboundDate = format(weekendStart, "eee, MMM d");
    const inboundDate = format(weekendEnd, "eee, MMM d");

    dateDetails = {
      weekendStart,
      weekendStartFormated,
      weekendEndFormated,
      outboundDate,
      inboundDate
    };
    return dateDetails;
  }

  const dateDetails = getDatesForInspirations();
  function handleClick(e) {
    const tripInspiration = {
      originPlace: { PlaceId: originByIp },
      destinationPlace: { PlaceId: placeId },
      outboundDate: dateDetails.weekendStartFormated,
      adults: 1,
      inboundDate: dateDetails.weekendEndFormated,
      children: 0,
      infants: 0,
      directOnly: false,
      oneWay: false,
      sortType: "price"
    };

    getOffers(tripInspiration);
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={img} title={name} />
      <CardContent className={classes.content}>
        <Typography
          align="left"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {name}, {country}
        </Typography>
      </CardContent>

      <CardActions onClick={handleClick} className={classes.actions}>
        <Button size="small" color="primary">
          Fly Next Weekend
        </Button>
      </CardActions>
      <CardContent className={classes.caption} pb={1}>
        <Typography
          align="left"
          variant="caption"
          color="textSecondary"
          component="p"
        >
          {dateDetails.outboundDate} - {dateDetails.inboundDate}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CityCard;
