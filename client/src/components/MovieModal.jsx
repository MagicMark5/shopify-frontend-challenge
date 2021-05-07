import { useState, useEffect } from 'react'
import axios from 'axios'
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  },
  info: {
    margin: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'rgb(53, 58, 70, 0.9)',
    border: '1px solid grey',
    borderRadius: '6px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '600px'
  }, 
  imdbIDBlock: {
    borderBottom: '1px solid grey'
  }, 
  subText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.6em',
    padding: '3px'
  },
  textDivider: {
    color: "rgba(255, 255, 255, 0.5)",
    margin: "0 1em",
  },
  posterContainer: {
    float: 'left', 
    width: '100px',
    height: '200px',
    margin: '0.3em 0.3em 0.3em 0'
  },
  poster: {
    width: 'inherit'
  },
  bodyText: {
    fontSize: '0.7em',
    minWidth: '100%',
    width: '0',
  }
}));


export default function MovieModal(props) {
  const classes = useStyles();
  const { imdbID } = props
  // toggle state for modal
  const [open, setOpen] = useState(false);
  // holds the omdb response {} for this movie
  const [modalData, setModalData] = useState({}); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { 
    Title, 
    Poster, 
    Year, 
    Rated, 
    Runtime, 
    Genre, 
    Released 
  } = modalData;

  const textDivider = (<small className={classes.textDivider}>|</small>);

  const body = ( 
    <div className={classes.paper}>
      <div className={classes.imdbIDBlock}>
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
      <p id="transition-modal-description" className={classes.bodyText}>
        {modalData.Plot}
      </p>
    </div>
  )

  useEffect(() => {
    if (imdbID) {
      // post imdbID to shoppies-backend on first render
      axios.post(`/api/movies/${imdbID}`, { imdbID: imdbID })
      .then(res => {
        const movie = res.data ? res.data : {};
        setModalData(movie);
      })
      .catch(e => {
        console.log(e)
        setModalData({});
      })
    }
  }, [imdbID]);


  return (
    <>
      <InfoIcon 
        className={classes.info} 
        aria-describedby="movie-info" 
        variant="contained" 
        color="action" 
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