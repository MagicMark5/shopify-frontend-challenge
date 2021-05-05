import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MoviePopover from '../components/MoviePopover';

export default function parseListItems(movie, clickHandler, isNomination, currentNominations = [], fiveSelected) {
  const { Title, Year, Poster, imdbID } = movie;
  const movieData = { Title, Year, Poster }
  const movieString = JSON.stringify(movieData);
  const isButtonDisabled = fiveSelected || currentNominations.includes(movieString) ? true : false;
  const iconClass = isNomination ? "fas fa-trash" : "fas fa-trophy";

  const avatarStyle = {
    height: '60px',
    width: '60px',
    marginRight: '1em'
  }

  return (<ListItem key={`${Title} (${Year}) [${imdbID}]`}>
            <ListItemAvatar>
              <Avatar src={Poster} style={avatarStyle}>
                <Icon className="fas fa-film" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${Title} (${Year})`}/>
            <MoviePopover 
              title={Title}
              year={Year}
              poster={Poster}
              imdbID={imdbID}
              />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="add"
                disabled={isButtonDisabled}
                name={movieString} 
                data-testid="nominateBtn" 
                onClick={clickHandler}>
                <Icon className={iconClass} name={movieString}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>);
}