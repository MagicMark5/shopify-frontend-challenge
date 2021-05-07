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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));


export default function MovieModal(props) {
  const classes = useStyles();
  const { title } = props
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

  useEffect(() => {
    if (title) {
      // post title to shoppies-backend on first render
      axios.post('/api/movies/title', { title: title })
      .then(res => {
        const movie = res.data ? res.data : {};
        setModalData(movie);
      })
      .catch(e => {
        console.log(e)
        setModalData({});
      })
    }
  }, [title])


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
        aria-labelledby="transition-modal-title"
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </>
  )
}