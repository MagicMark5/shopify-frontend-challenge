import { Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MoviePopover from '../components/MoviePopover';
import MovieModal from '../components/MovieModal';
import MovieButton from '../components/MovieButton';

// parseListItems is reused by both MovieResults and Nominations components 
// when mapping their respective movie arrays
// to parse a <li> for each movie and populate child components of each <li> (MovieResult or Nomination)

export default function parseListItems(movie, clickHandler, isNomination, currentNominations = [], fiveSelected) {
  // extract and stringify movie data
  // which will be passed into value attribute of button element
  const { Title, Year, Poster, imdbID } = movie;
  const movieData = { Title, Year, Poster, imdbID }
  const movieString = JSON.stringify(movieData);

  // disable nominate/trophy button if 5 nominations are already selected 
  // or if that movie is already selected
  const isButtonDisabled = fiveSelected || currentNominations.includes(movieString);

  // Conditionally assign font awesome (fa) icon class name of button to trophy or trash 
  // based on isNomination boolean parameter (add nomation or delete nomation)
  const faClass = isNomination ? "fas fa-trash" : "fas fa-trophy";

  return (
    <Fragment key={`${Title} (${Year}) [${imdbID}]`}>
      <ListItem>

        {/* Custom component to render movie avatar with popover on click*/}
        <MoviePopover 
          title={Title}
          year={Year}
          poster={Poster}
        />

        {/* material-ui component for title (year) text */}
        <ListItemText primary={`${Title} (${Year})`}/>

        {/* Custom component to render info icon with modal on click*/}
        <MovieModal imdbID={imdbID}/>

        <ListItemSecondaryAction>

          {/* Custom component to render nomination button or delete button */}
          <MovieButton
            isButtonDisabled={isButtonDisabled} 
            movieString={movieString}
            clickHandler={clickHandler} 
            faClass={faClass}
          />

        </ListItemSecondaryAction>
      </ListItem>
      <Divider light variant="inset"/>
    </Fragment>
  );
}