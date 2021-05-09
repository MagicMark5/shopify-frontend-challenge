import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  background: {
    backgroundColor: "inherit"
  },
  title: {
    fontSize: '5.9vw',
    margin: theme.spacing(3, 2, 1),
    padding: theme.spacing(3, 2, 1)
  },
}));

