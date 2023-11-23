import React from "react";
import useStyles from "./styles.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails.jsx";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@material-ui/core";

const List = ({
  places,
  setSavedPlaces,
  savedPlaces,
  childClicked,
  isLoading,
  setType,
  type,
  setRating,
  rating,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining Places</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl
            className={classes.formControl}
            style={{ marginRight: "1rem" }}
          >
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
              <MenuItem value="restaurants">Restuarants</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} style={{ width: "30%" }}>
            <InputLabel>Ratings</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, idx) => (
              <Grid item key={idx} xs={12}>
                <PlaceDetails place={place} setSavedPlaces={setSavedPlaces} savedPlaces={savedPlaces} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
