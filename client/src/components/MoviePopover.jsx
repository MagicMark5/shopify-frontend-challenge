import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
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
  const { title, year, poster } = props;

  // holds toggle state for the popover component
  const [anchorEl, setAnchorEl] = useState(null);

  // toggle popover when avatar is clicked
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const avatarStyle = {
    height: '60px',
    width: '60px',
    marginRight: '1em'
  }

  return (
    <>
      <ListItemAvatar button="true" onClick={handleClick}>
        <Avatar src={poster} style={avatarStyle}>
          <Icon className="fas fa-film" />
        </Avatar>
      </ListItemAvatar>
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
          onClick={handleClose}
        />
        <Typography className={classes.typography}>
          {title} ({year})
        </Typography>
      </Popover>
    </>
  );
};