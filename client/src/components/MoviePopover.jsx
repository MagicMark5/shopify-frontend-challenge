import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  },
  info: {
    margin: theme.spacing(1)
  }
}));

export default function MoviePopover(props) {
  const classes = useStyles();
  const { title, year, poster, imdbID } = props;

  // toggles the popover component
  const [anchorEl, setAnchorEl] = useState(null);

  // the movie title query 't' to omdb GET request
  //const [currentTitle, setCurrentTitle] = useState(title); 

  // holds the omdb response {}
  const [popoverData, setPopoverData] = useState({}); 

  useEffect(() => {

    if (title) {
      // post query to shoppies-backend on App re-render
      axios.post('/api/movies/title', { title: title })
      .then(res => {
        const movie = res.data ? res.data : {};
        setPopoverData(movie);
        console.log(movie);
      })
      .catch(e => {
        console.log(e)
        setPopoverData({});
      })
    }

  }, [title])


  // Popover toggle
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? imdbID : undefined;

  return (
    <>
      <InfoIcon 
        className={classes.info} 
        aria-describedby={id} 
        variant="contained" 
        color="action" 
        onClick={handleClick} 
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <CardMedia 
          component="img"
          alt={title}
          height="450"
          src={poster}
          title={title}
        />
        <Typography className={classes.typography}>
          {title} ({year})
          {popoverData.Genre}
          {popoverData.Director}
          {popoverData.Actors}
          {popoverData.Awards}
        </Typography>
      </Popover>
    </>
  );
};