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

  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    console.log(bounds, setWeatherData);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
    getPlaces(bounds.sw, bounds.ne)
      .then((res) => {
        console.log("repsooooooo", res);
        setPlaces(res);
      })
      .catch((err) => console.log(err));
  }, [bounds, coordinates]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
