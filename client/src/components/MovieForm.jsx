import { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import makeStyles from '../styles/movieFormStyle';


export default function MovieForm(props) {
  const [movie, setMovie] = useState("");

  // material-ui
  const classes = makeStyles();

  const handleSubmit = (event) => {
    event.preventDefault()
    // pass query string to App as movie 
    props.handleSubmitAction(movie.trim())
    // reset input
    setMovie("")
  }

  const handleChange = event => {
    const value = event.target.value
    if (value.length <= 100) {
      setMovie(value)
    }
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <InputBase
          name="movie"
          value={movie}
          onChange={handleChange}
          placeholder="Enter a movie title..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 
            'aria-label': 'search', 
            'data-testid': 'search' 
          }}
        />
      </form>
    </div>
  )
}