import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Box from "@mui/system/Box";
import useStyles from "./styles.js";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

import { Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const PlaceDetails = ({ place, setSavedPlaces, savedPlaces }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSaveClick = (e) => {
    if (!place.isSaved) {
      setOpen(true);
      place.isSaved = true;
      setSavedPlaces([...savedPlaces, place]);
    }
  };

  return (
    <Card elevation={6} style={{ marginTop: "1rem" }}>
      <CardMedia
        style={{ height: 350, margin: ".5rem" }}
        image={
          place.photo
            ? place.photo.images.medium.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent style={{ padding: "12px" }}>
        <Typography gutterBottom variant="h6">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Rating
            name="read-only"
            size="small"
            value={Number(place.rating)}
            readOnly
          />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography component="legend">Ranking</Typography>
          <Typography variant="subtitle2" style={{ width: "50%" }}>
            {place.ranking}
          </Typography>
        </Box>
        {place?.cuisine?.map((dish) => (
          <Chip
            size="small"
            key={dish.name}
            label={dish.name}
            className={classes.chip}
          />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions style={{ paddingTop: "0" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisors
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>

        <Button size="small" color="primary" onClick={handleSaveClick}>
          {place.isSaved ? "Saved" : "Save"}
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Saved"
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        />
      </CardActions>
    </Card>
  );
};
export default PlaceDetails;
