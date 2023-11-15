import React, { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@material-ui/core";

const App = () => {
  const [coords, setCoords] = useState({});
  //   const [type, setType] = useState("restaurants");
  // const [isLoading, setIsLoading] = useState(false);

  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    console.log(bounds, setWeatherData);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, [bounds]);

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
            setCoords={setCoords}
            coords={coords}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
