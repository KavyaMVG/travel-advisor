import { AppBar, Toolbar, Typography, Box, InputBase} from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
// import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api';




const Header = ({onLoad, onPlaceChanged}) => {
    const classes = useStyles();

 
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