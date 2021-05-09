import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  background: {
    backgroundColor: "inherit"
  },
  title: {
    margin: theme.spacing(3, 2, 1),
    padding: theme.spacing(3, 2, 1)
  },
  link: {
    color: 'white',
    '&:hover': {
      color: 'blue'
    }
  }
}));

