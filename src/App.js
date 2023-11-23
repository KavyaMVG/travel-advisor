import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlaces } from "./api";

const App = () => {
  const [coordinates, setCoordinates] = useState({});
  //   const [type, setType] = useState("restaurants");
  // const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilterdPlaces] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);

  const [bounds, setBounds] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoCom) => setAutoComplete(autoCom);

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    console.log({ lat, lng });

    setCoordinates({ lat: lat, lng: lng });
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
    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { latitude, longitude } }) => {
    //     setCoordinates({ lat: latitude, lng: longitude });
    //   }
    // );
    setIsLoading(true);
    if (bounds) {
      getPlaces(type, bounds.sw, bounds.ne)
        .then((res) => {
          setIsLoading(false);
          setFilterdPlaces([]);
          setPlaces(res);
        })
        .catch((err) => console.log(err));
    }
  }, [bounds, coordinates, type]);

  return (
    <>
      <CssBaseline />
      <Header
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        savedPlaces={savedPlaces}
        setSavedPlaces={setSavedPlaces}
      />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
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
            weatherData={weatherData}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
