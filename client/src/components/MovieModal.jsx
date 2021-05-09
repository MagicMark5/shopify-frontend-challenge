import { useState, useEffect } from 'react'
import axios from 'axios'
import InfoIcon from '@material-ui/icons/Info';
import makeStyles from '../styles/movieModalStyle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Link, Typography } from '@material-ui/core';

export default function MovieModal(props) {
  const classes = makeStyles();
  const { imdbID } = props
  // toggle state for modal
  const [open, setOpen] = useState(false);
  // holds the omdb response {} for this movie
  const [modalData, setModalData] = useState({}); 

  // toggle open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (imdbID) {
      // post imdbID to shoppies-backend on first render
      axios.post(`/api/movies/${imdbID}`, { imdbID: imdbID })
      .then(res => {
        const movie = res.data ? res.data : {};
        // get movie data from imdb
        setModalData(movie);
      })
      .catch(e => {
        console.log(e)
        setModalData({});
      })
    }
  }, [imdbID]);

  const { 
    Title, 
    Poster, 
    Plot,
    Year, 
    Rated, 
    Runtime, 
    Genre, 
    Released, 
    Director, 
    Actors,
    Awards
  } = modalData;

  const textDivider = (<small className={classes.textDivider}>|</small>);

  const body = ( 
    <div className={classes.paper}>
      <div className={classes.titleBlock}>
        <h3 id="transition-modal-imdbID">{Title} <small>({Year})</small></h3>
        <div className={classes.subText}>
          <small>{Rated}</small>{textDivider}
          <small>{Runtime}</small>{textDivider}
          <small>{Genre}</small>{textDivider}
          <small>{Released}</small>
        </div>
      </div>
      <div className={classes.posterContainer}>
        <img 
          className={classes.poster} 
          src={Poster} 
          alt={`${Title} Poster`} 
          title={`${Title} Poster`}/>
      </div>
      <Typography 
        id="transition-modal-description" 
        variant='body2' 
        className={classes.bodyText}>
          {Plot}
      </Typography>
      <div className={classes.infoText}>
        <Typography><b>Director:</b> {Director}</Typography>
        <Typography><b>Stars:</b> {Actors}</Typography>
        <Typography><b>Awards:</b> {Awards}</Typography>
      </div>
      <div className={classes.links}>
        <Typography>
          <Link className={classes.imdbIDLink}
            href={`https://www.imdb.com/title/${imdbID}`} 
            target="_blank"
            rel="noreferrer"
            color="primary"
            >
            Read more on imdb
          </Link>
        </Typography>
        <Typography>
          <Button onClick={handleClose} color="primary">Close</Button>
        </Typography>
      </div>
    </div>
  )

  return (
    <>
      <InfoIcon 
        className={classes.info} 
        aria-describedby="movie-info" 
        variant="contained" 
        color="action" 
        title="movie information"
        onClick={handleOpen} 
      />
      <Modal
        aria-labelledby="transition-modal-imdbID"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {body}
        </Fade>
      </Modal>
    </>
  )
}