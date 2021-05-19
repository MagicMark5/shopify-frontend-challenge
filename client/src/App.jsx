import { useState, useEffect } from 'react'
import axios from 'axios'

// Styling
import './App.scss';
import makeStyles from "./styles/theShoppiesTitle";
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

// App Components & helpers
import MovieForm from './components/MovieForm';
import MovieResults from './components/MovieResults';
import Nominations from './components/Nominations';
import removeDuplicates from './helpers/removeDuplicates';

function App() {
  // Get previous state of currentNominations from local storage if present
  const prevStorage = localStorage.getItem('nominations') || [];
  // Parse previous storage if any - we use this value for the initial state
  const prevNominations = prevStorage.length > 0 ? JSON.parse(prevStorage) : [];
  // Use material-ui classes defined in styles folder
  const classes = makeStyles();

  // Set React state & banner flag
  const [currentMovie, setCurrentMovie] = useState(""); // the movie search query 's'
  const [currentResults, setCurrentResults] = useState([]) // search results
  const [currentNominations, setNominations] = useState(prevNominations) // nominations list
  const showBanner = currentNominations.length === 5 ? true : false;
  

  // Post the movie query to our server, who will fire off the query to omdbAPI in the back-end
  // The server responds with the omdb api query results
  useEffect(() => {

    if (currentMovie) {
      // post query to shoppies-backend on App re-render / when the query changes
      axios.get(`api/movies/search/${currentMovie}`)
      .then(res => {
        const movieArray = res.data.Search ? res.data.Search : [];
        const uniqueResults = removeDuplicates(movieArray);
        setCurrentResults(uniqueResults);
      })
      .catch(e => {
        console.log(e)
        setCurrentMovie(null)
      })
    }

  }, [currentMovie])

  return (
    <div className="App">
      {/*App Header*/}
      <Typography variant="h2" className={classes.title}>
        The Shoppies
      </Typography>

      {/* Search form component --> See components folder MovieForm.jsx */}
      <section className="movieForm">
        <MovieForm handleSubmitAction={setCurrentMovie} />
      </section>

      {/* conditionally render the banner indicating user has selected all 5 movies */ }
      {showBanner && <section className="banner">You are ready for the shoppies 🏆</section>}

      {/* MovieResults & Nominations components share a container --> See components folder */}
      <section className="results-nominations">
        <MovieResults 
          movieList={currentResults} 
          query={currentMovie} 
          currentNominations={currentNominations}
          handleNominateAction={setNominations}
        />
        <Nominations 
          currentNominations={currentNominations}
          removeNomination={setNominations}
        />
      </section>

      {/* GitHub Link for source code */}
      <footer className="footer">
        <Typography>
          <Link
              href={`https://github.com/MagicMark5/shoppify-frontend-challenge`} 
              target="_blank"
              rel="noreferrer"
              className={classes.link}
              >
              See the source code on GitHub
            </Link>
        </Typography>
      </footer>
    </div>
  );
}

export default App;
