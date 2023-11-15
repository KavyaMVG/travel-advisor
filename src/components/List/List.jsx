import React, { useState } from 'react'
import useStyles from './styles.js'
import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx'
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';


const List = () => {
  const classes = useStyles();
  const [type, setType] = useState('Hotels')
  const [rating, setRating] = useState('')

   const places = [{name:'bcg'}, {name:'jjjj'}, {name:'jjjjjio'}]
  return (
    <div className={classes.container}>
      <Typography variant='h4'>Hotels</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value='Hotels'>Hotels</MenuItem>
          <MenuItem value='Places'>Places</MenuItem>
          <MenuItem value='Places'>Restuarants</MenuItem>
        </Select>
      </FormControl>
          <FormControl className={classes.formControl}>
        <InputLabel>Ratings</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places.map((place, idx) => (<Grid item key={idx} xs={12}>
          <PlaceDetails place={place}/>
        </Grid>) )}

      </Grid>
   
        </div>
  )
}

export default List