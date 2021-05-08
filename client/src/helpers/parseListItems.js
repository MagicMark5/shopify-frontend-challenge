import { Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import MoviePopover from '../components/MoviePopover';
import MovieModal from '../components/MovieModal';

export default function parseListItems(movie, clickHandler, isNomination, currentNominations = [], fiveSelected) {
  const { Title, Year, Poster, imdbID } = movie;
  const movieData = { Title, Year, Poster, imdbID }
  const movieString = JSON.stringify(movieData);
  const isButtonDisabled = fiveSelected || currentNominations.includes(movieString) ? true : false;
  const iconClass = isNomination ? "fas fa-trash" : "fas fa-trophy";

  return (
    <Fragment key={`${Title} (${Year}) [${imdbID}]`}>
      <ListItem  >
        {/*render movie avatar with popover on click*/}
        <MoviePopover 
          title={Title}
          year={Year}
          poster={Poster}
        />
        <ListItemText primary={`${Title} (${Year})`}/>
        {/*render info icon with modal on click*/}
        <MovieModal imdbID={imdbID}/>
        {/* render nomination button or delete button */}
        <ListItemSecondaryAction>
          <IconButton 
            edge="end" 
            aria-label="add-nomination"
            disabled={isButtonDisabled}
            name={movieString} 
            data-testid="nominateBtn" 
            color="primary"
            onClick={clickHandler}>
            <Icon className={iconClass} name={movieString}/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider light variant="inset"/>
    </Fragment>
  );
}