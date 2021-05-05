import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.scss';
import makeStyles from "./styles/theShoppiesTitle";
import Typography from '@material-ui/core/Typography';
import MovieForm from './components/MovieForm';
import MovieResults from './components/MovieResults';
import Nominations from './components/Nominations';
import removeDuplicates from './helpers/removeDuplicates';

function App() {
  // set initial state of currentNominations with local storage
  const prevNominations = JSON.parse(localStorage.getItem('nominations') || []);
  const classes = makeStyles();
  const [currentMovie, setCurrentMovie] = useState("")
  const [currentResults, setCurrentResults] = useState([])
  const [currentNominations, setNominations] = useState(prevNominations)
  const showBanner = currentNominations.length === 5 ? true : false;
  
  useEffect(() => {
    if (currentMovie) {
      // post query to shoppies-backend on App re-render
      axios.post('/api/movies', { movie: currentMovie })
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
      <Typography variant="h2" className={classes.title}>
        The Shoppies
      </Typography>
      <section className="movieForm">
        <MovieForm handleSubmitAction={setCurrentMovie} />
      </section>
      {showBanner && <section className="banner">You are ready for the shoppies 🏆</section>}
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
    </div>
  );
}

export default App;
