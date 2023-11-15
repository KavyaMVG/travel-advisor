import React from "react";
import GoogleMapReact from "google-map-react";
import useStyles from "./styles.js";

// const containerStyle =
const center = {
  lat: -3.745,
  lng: -38.523,
};
const coords = { lat: 0, lng: 0 };
const Map = () => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        center={center}
        coords={coords}
        bootstrapURLKeys={process.env.MAP_API_KEY}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={""}
        onChildClick={""}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
