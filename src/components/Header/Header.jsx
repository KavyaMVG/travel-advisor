import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Modal,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Chip,
  Button,
  CardContent,
} from "@material-ui/core";

import React, { useState } from "react";
import useStyles from "./styles";
// import { Autocomplete } from '@material-ui/lab';
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@react-google-maps/api";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

import StarRateIcon from "@material-ui/icons/StarRate";
import { Rating } from "@material-ui/lab";
// import { Button } from '@material-ui/core'

const Header = ({ onLoad, onPlaceChanged, savedPlaces, setSavedPlaces }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    gridAutoRows: "minmax(100px, auto)",
    padding: "10px",
  };

  const removePlace = (deletedPlace) => {
    const filterdPlaces = savedPlaces.filter(
      (places) => places.name !== deletedPlace.name
    );
    setSavedPlaces(filterdPlaces);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" className={classes.title}>
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search...."
                classes={{ root: classes.inputInput }}
              />
            </div>
          </Autocomplete>
          {savedPlaces?.length > 0 && (
            <StarRateIcon onClick={() => setOpen(true)} />
          )}
        </Box>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.savedModal}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              style={{ textAlign: "center", padding: "1rem" }}
              component="h2"
            >
              Saved Places
            </Typography>
            <Grid style={containerStyle}>
              {savedPlaces?.map((place, idx) => (
                <Card
                  elevation={4}
                  key={idx}
                  style={{ width: "100%", flex: "1 1" }}
                >
                  <CardMedia
                    style={{ height: 200 }}
                    image={
                      place.photo
                        ? place.photo.images.medium.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    title={place.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {place.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" my={2}>
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
                    <Box display="flex" justifyContent="space-between" my={2}>
                      <Typography component="legend">Price</Typography>
                      <Typography gutterBottom variant="subtitle1">
                        {place.price_level}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography component="legend">Ranking</Typography>
                      <Typography gutterBottom variant="subtitle1">
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
                  <CardActions>
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

                    <Button
                      size="small"
                      color="primary"
                      onClick={() => removePlace(place)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
