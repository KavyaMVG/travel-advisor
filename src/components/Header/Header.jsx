import { AppBar, Toolbar, Typography, Box, InputBase} from '@material-ui/core'
import React, {useState} from 'react'
import useStyles from './styles'
// import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';




const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autoComplete, setAutoComplete] = useState(null)

    const onLoad = (autoCom) =>{setAutoComplete(autoCom)}

    const onPlaceChanged = () =>{
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();

       setCoordinates({lat:lat, lng:lng})
    }
  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h6' className={classes.title}>
                Travel Advisor
            </Typography>
            <Box  style={{display:'flex', alignItems:'center'}}>
                <Typography variant='h6' className={classes.title}>
                    Explore New Places
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder='Search....' classes={{root:classes.inputInput}}/>

                    </div>
                </Autocomplete>

            </Box>

        </Toolbar>

    </AppBar>
  )
}

export default Header