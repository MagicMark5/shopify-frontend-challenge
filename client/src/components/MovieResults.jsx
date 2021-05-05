import makeStyles from "../styles/movieResultsStyle";
import parseListItems from "../helpers/parseListItems";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';


export default function MovieResults(props) {
  const classes = makeStyles();
  const { movieList, currentNominations, handleNominateAction } = props
  const fiveSelected = currentNominations.length === 5 ? true : false;
  const showTip = movieList.length === 0 ? true : false;
  
  const validatedMovies = Array.isArray(movieList) ? movieList : [];

  // Conditionally render results heading
  const resultHeading = validatedMovies.length > 0 ? `Results for "${props.query}"` : `No Results for "${props.query}" 🤷🏽‍♂️` 

  // The onClick handler for each nominate movie IconButton 
  const nominateMovie = (event) => {
    // get movie data from name prop of whichever element was clicked (either button or icon)
    const movie = event.target.name ? event.target.name : event.target.offsetParent.name;
    handleNominateAction([...currentNominations, movie]);
  }

  // parse movies and conditionally enable buttons and button icon (false = trophy)
  const parsedMovies = validatedMovies
    .map(movie => parseListItems(movie, nominateMovie, false, currentNominations, fiveSelected));
  
  return (
    <section className="results">
      <Typography variant="h5" className={classes.title}>{resultHeading}</Typography>
      {showTip && <Typography variant="h6" className={classes.title}>
        Enter a movie title into the search bar to see some films
        </Typography>}
      <div className={classes.background}>
        <List>
          {parsedMovies}
        </List>
      </div>
    </section>
  )
}