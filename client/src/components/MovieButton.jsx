import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "default",
    '&:hover': {
      backgroundColor: "rgba(146, 158, 226, 0.05)",
    }
  }, 
  icon: {
    color: "rgba(18, 149, 189, 0.687)", 
  }
}));

// Rendered as a trophy or a trash can icon button depending on the parent component
export default function MovieButton(props) {
  const classes = useStyles();

  // Destructure data from parseListItems
  // movieString contains JSON.stringified Title, Year, Poster, imdbID that is added/removed from 
  // Nominations when the button is clicked
  const {
    isButtonDisabled, 
    movieString, 
    clickHandler, 
    faClass
  } = props;

  const action = faClass === 'fas fa-trophy' ? 'Add' : 'Remove'; 
  // Append font awesome class to custom style classes 
  const iconClass = `${classes.icon} ${faClass}`

  /* the movieString prop contains the movie data 
    and is stored in the name attribute of the button. 
    The name attr of the button is parsed when the button is clicked 
    in its parent component e.g. JSON.parse(event.target.name) */

  return (
    <IconButton 
      className={classes.button}
      edge="end" 
      aria-label="add-nomination"
      title={`${action} Nomation`}
      disabled={isButtonDisabled}
      name={movieString} 
      data-testid="nominateBtn" 
      color="action"
      onClick={clickHandler}>
      <Icon className={iconClass} name={movieString}/>
    </IconButton>
  );
};