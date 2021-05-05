import { useEffect } from 'react'
import parseListItems from "../helpers/parseListItems";
import makeStyles from "../styles/movieResultsStyle";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

export default function Nominations(props) {
  const classes = makeStyles();
  const { currentNominations, removeNomination } = props
  const headingText = currentNominations.length === 0 ? `You have no nominations` : `Nominations`;
  const showTip = currentNominations.length === 0 ? true : false;

  const handleRemoveNomination = (event) => {
    // get movie data from name prop of whichever element was clicked (either button or icon)
    const movie = event.target.name ? event.target.name : event.target.offsetParent.name;
    const copyNominations = [...currentNominations];
    const updatedNoms = copyNominations.filter(nom => nom !== movie)
    removeNomination([...updatedNoms]);
  }  
  
  // parse nomination and conditional button icon (true = trash can)
  const parsedNominations = currentNominations.map((nomination) => {
    const movieData = JSON.parse(nomination);
    return parseListItems(movieData, handleRemoveNomination, true);
  });

  useEffect(() => {
    // Save currentNominations to local storage on each change
    localStorage.setItem("nominations", JSON.stringify(currentNominations));
  }, [currentNominations]);
  
  
  return (
    <section className="nominations">
      <Typography variant="h5" className={classes.title}>
        {headingText}
      </Typography>
      {showTip && <Typography variant="h6" className={classes.title}>
        Click the trophy icon from the movie results to nominate a film
        </Typography>}
      <List>
        {parsedNominations}
      </List>
    </section>
  )
}