import React, { createRef, useEffect, useState } from "react";
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
  isLoading,
  setType,
  type,
  childClicked,
  setRating,
  rating,
  removePlace,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining Places</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "1rem" }}>
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
            <FormControl
              className={classes.formControl}
              style={{ width: "30%" }}
            >
              <InputLabel>Ratings</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, idx) => (
              <Grid ref={elRefs[idx]} item key={idx} xs={12}>
                <PlaceDetails
                  place={place}
                  setSavedPlaces={setSavedPlaces}
                  savedPlaces={savedPlaces}
                  removePlace={removePlace}
                  selected={Number(childClicked) === idx}
                  refProp={elRefs[idx]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
