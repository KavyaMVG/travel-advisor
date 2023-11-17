import { Box, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles.js'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Button } from '@material-ui/core'

const PlaceDetails = ({place}) => {
    const classes = useStyles();

        console.log('place', place)

  return (
    <Card>
      <CardMedia style={{height:'350'}} title={place.name} image='https://images.pexels.com/photos/18378791/pexels-photo-18378791/free-photo-of-nature-s-child.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'/>
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>$$</Typography>
        </Box>
         <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>5 star</Typography>
        </Box>
        <Chip size='small' label='name'/>
        {place?.address && (<Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
          <LocationOnIcon/>
        </Typography>)}
        <CardActions>
          <Button size='small' color='primary' onClick={() => window.open()}>
            Trip Advisors
          </Button>
          <Button size='small' color='primary' onClick={() => window.open()}>
            Website
          </Button>
        </CardActions>

      </CardContent>

    </Card>
  )
}

export default PlaceDetails