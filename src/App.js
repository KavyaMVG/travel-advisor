import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlaces } from "./api";

const App = () => {
  const [coordinates, setCoordinates] = useState({});

  const [places, setPlaces] = useState([]);
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilterdPlaces] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);

  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoCom) => setAutoComplete(autoCom);

  const onPlaceChanged = () => {
    const place = autoComplete.getPlace();

    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      console.log("lat", lat, lng);

      setCoordinates({ lat, lng });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilterdPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    if (bounds.sw && bounds.ne) {
      getPlaces(type, bounds.sw, bounds.ne)
        .then((response) => {
          setIsLoading(false);
          setFilterdPlaces([]);
          setPlaces(
            response?.filter((place) => place.name && place.num_reviews > 0)
          );
        })
        .catch((err) => console.log(err));
    }

    // coordinates;
  }, [bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        savedPlaces={savedPlaces}
        places={places}
        setPlaces={setPlaces}
        setSavedPlaces={setSavedPlaces}
      />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setSavedPlaces={setSavedPlaces}
            savedPlaces={savedPlaces}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
