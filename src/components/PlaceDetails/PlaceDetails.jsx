import { Box, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles.js'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone';

import { Button } from '@material-ui/core'

const PlaceDetails = ({place}) => {
    const classes = useStyles();

console.log('placeDetails', place)
  return (
    <Card elevation={6}>
      <CardMedia 
      style={{height:350}}
      image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
       title={place.name}
        />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between' my={2}>
          <Typography  component="legend">Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
        </Box>
         <Box display='flex' justifyContent='space-between'>
          <Typography  component="legend">Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.cuisine?.map((dish) => (<Chip size='small' key={dish.name} label={dish.name} className={classes.chip}/>))}
        
        {place?.address && (<Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
          <LocationOnIcon/>{place.address}
        </Typography>)}
          {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
         <CardActions>
          <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisors
          </Button>
          <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>

    </Card>
  )
}

export default PlaceDetails