# Shopify Web Developer (Front End) Intern Challenge

A web app that can search the [OMDB](http://www.omdbapi.com/) for movies. It allows the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees a banner will appear signalling they're finished and are ready for Shopify's fictional awards ceremony, The Shoppies.

* [See the challenge app](https://shoppies-app-magicmark.herokuapp.com/)
* [See the challenge specifications](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit#)

## Screenshots

!["Adding a nomination from movie results to nominations"](https://github.com/MagicMark5/shoppify-frontend-challenge/blob/master/docs/results-nominations.png?raw=true)

!["Clicking movie avatar opens popover of full movie poster"](https://github.com/MagicMark5/shoppify-frontend-challenge/blob/master/docs/avatar-popover.png?raw=true)

!["Clicking the info icon opens modal of full movie details](https://github.com/MagicMark5/shoppify-frontend-challenge/blob/master/docs/movie-modal.png?raw=true)

## Features

Users may: 
* Search OMDB and display the results (movies only)
* Add a movie from the search results to the nominations list
* Remove a nominee from the nominations list
* Leave the page and have their nominations automatically saved in local storage
* View the full movie poster and title by clicking the movie avatar 
* View more information about a film by clicking an info icon
    * Rating, Duration, Genre, Release Date
    * Plot description
    * Director, Actors, Awards
    * A link to the movie's imdb page 

## General Notes 

I created a back-end server for a front-end challenge for the primary reason of concealing the OMDB api key (best practices for making API requests). But also to have an option to grow the application in future (a database connection, user routes). 

## Running the code 

The app is hosted [here](https://shoppies-app-magicmark.herokuapp.com/). But if you wish to run the code yourself: 

First, install dependencies for the server by running `npm install` in the project root directory, and then run the same command again while in the `client` folder. 

1. To run the server, in one terminal window run `npm start` while inside the project root directory (The server will listen on port 3001).
2. Then in another terminal window, run `npm start` while inside the `client` folder.
3. Open your browser and go to http://localhost:3000/ 

## Tech Stack 

### Front-End (client folder):
* React
* Sass
* Material-UI

#### Dependencies
* axios
* node-sass
* material-ui
* react-testing-library (devDependency)

### Back-End (root directory):
* Node/Express

#### Dependencies
* express
* axios
* dotenv
* nodemon






