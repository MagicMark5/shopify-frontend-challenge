import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  titleBlock: {
    borderBottom: '1px solid grey'
  }, 
  subText: {
    display: 'flex',
    justifyContent: 'space-around',
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
    margin: '0.3em 0.3em 0.3em 0'
  },
  poster: {
    width: 'inherit'
  },
  bodyText: {
    marginTop: '0.3em',
    fontSize: '0.7em',
    minWidth: '100%',
    width: '0',
  },
  infoText: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.6em',
    minWidth: '100%',
    width: '0',
  },
  links: {
    marginTop: '0.3em',
    borderTop: '1px solid grey',
    paddingTop: '1em',
    display: 'flex',
    justifyContent: 'center'
  }
}));

