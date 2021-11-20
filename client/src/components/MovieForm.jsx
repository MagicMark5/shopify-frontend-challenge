import { useState } from 'react'

// Material-ui components and custom style class from the styles folder
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import makeStyles from '../styles/movieFormStyle';

export default function MovieForm(props) {
  const [movie, setMovie] = useState("");

  // use style classes from movieFormStyle from styles folder
  const classes = makeStyles();

  const handleSubmit = (event) => {
    event.preventDefault()
    // pass query string to App as movie, cut off trailing & leading whitespace
    props.handleSubmitAction(movie.trim())
  }

  const handleChange = event => {
    const value = event.target.value
    // Limit input onchange to 100 characters
    if (value.length <= 100) {
      setMovie(value)
    }
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      
      {/* onBlur callback for submit ensures mobile users have their form submitted when pressing "Done" on mobile keyboard */}
      <form onSubmit={handleSubmit} onBlur={handleSubmit} autoComplete="off">
        <InputBase
          autoFocus={true}
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