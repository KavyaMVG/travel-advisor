import React from "react";
import GoogleMapReact from "google-map-react";
import useStyles from "./styles.js";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import { mapStyles } from "../../mapStyles.js";

// const dummyPlaces = [
//   {
//     name: "helll",
//     rating: "11000",
//     latitude: "12.89773",
//     longitude: "77.5892",
//     photo: {
//       images: {
//         small: {
//           height: "150",
//           url: "https://media-cdn.tripadvisor.com/media/photo-l/1c/86/84/e6/img-20210111-wa0034-largejpg.jpg",
//           width: "150",
//         },
//       },
//     },
//   },

//   {
//     name: "heii",
//     rating: "14000",
//     latitude: "12.89773",
//     longitude: "77.5892",
//     // photo: {
//     //   images: {
//     //     small: {
//     //       height: "150",
//     //       url: "https://media-cdn.tripadvisor.com/media/photo-l/1c/86/84/e6/img-20210111-wa0034-largejpg.jpg",
//     //       width: "150",
//     //     },
//     //   },
//     // },
//   },
//   {
//     name: "cute",
//     rating: "1000",
//     latitude: 12.89773,
//     longitude: 77.5892,
//   },
// ];

const Map = ({
  coordinates,
  setBounds,
  setCoordinates,
  places,
  setChildClicked,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  // const filteredPlaces = places?.filter(
  //   (place) => place.latitude !== undefined && place.longitude !== undefined
  // );
  // console.log({ filteredPlaces });

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        center={coordinates}
        defaultCenter={coordinates}
        bootstrapURLKeys={process.env.MAP_API_KEY}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, idx) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={idx}
          >
            {/* {console.log(
              "placeiiiiiii",
              place.latitude,
              place.longitude,
              place?.photo?.images.small.url,
              place.rating,
              place.name
            )} */}
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {" "}
                  {place.name}
                </Typography>
                {/* <img
                  alt=""
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.small.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                /> */}
                {place.photo?.images?.large?.url ? (
                  <img
                    alt=""
                    className={classes.pointer}
                    src={place.photo.images.large.url}
                  />
                ) : (
                  <img
                    alt=""
                    className={classes.pointer}
                    src="https://media-cdn.tripadvisor.com/media/photo-l/1c/86/84/e6/img-20210111-wa0034-largejpg.jpg"
                  />
                )}
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
