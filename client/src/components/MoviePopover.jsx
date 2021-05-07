import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';

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
  const { title, year, poster } = props;

  // holds toggle state for the popover component
  const [anchorEl, setAnchorEl] = useState(null);

  // holds the omdb response {} for this movie
  const [popoverData, setPopoverData] = useState({}); 

  useEffect(() => {
    if (title) {
      // post title to shoppies-backend on first render
      axios.post('/api/movies/title', { title: title })
      .then(res => {
        const movie = res.data ? res.data : {};
        setPopoverData(movie);
      })
      .catch(e => {
        console.log(e)
        setPopoverData({});
      })
    }
  }, [title])

  // toggle popover
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          alt={`Movie poster for ${title}`}
          height="450"
          src={poster}
          title={title}
        />
        <Typography className={classes.typography}>
          {title} ({year})
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={popoverData.Genre}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={popoverData.Director}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={popoverData.Actors}/>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};