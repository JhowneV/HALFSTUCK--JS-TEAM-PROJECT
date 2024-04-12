const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=b5e824a3d922f68ba211fcf6dbdcb6f5';
const API_URL = BASE_URL + '/discover/movie?sort_by-popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const getGenres = BASE_URL + '/genre/movie/list' + API_KEY;


const options = {
  params: {
    key: API_KEY,
    query: '',
    include_adult: false,
    language: 'en-US',
    primary_release_year: '',
    page: 1,
    region: '',
    year: '',
  },
};


// const form = document.getElementById('lib-buttons');

//Watched

// document.addEventListener('DOMContentLoaded', function() {
    const watchedBtn = document.getElementById('watched-btn');
    const moviesContainer = document.querySelector('.gallery');
    let watchedMovies = JSON.parse(localStorage.getItem('movie-watched')) || [];

    watchedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        getWatchedMovies();
    });

    async function getWatchedMovies() {
    moviesContainer.innerHTML = ''; 
    for (const movieId of watchedMovies) {
        try {
            // Check if the movieId is valid
            if (!isValidMovieId(movieId)) {
                throw new Error(`Invalid movie ID: ${movieId}`);
            }
            const movie = await getMovieDetailsById(movieId);
            const movieElement = createMovieElement(movie);
            moviesContainer.appendChild(movieElement);
        } catch (error) {
            if (error.message === 'Movie not found.') {
                console.warn(`Movie with ID ${movieId} not found.`);
            } else {
                console.error('Failed to display movie:', error);
            }
        }
    }
}
    async function getMovieDetailsById(movieId) {
    const API_KEY = "b5e824a3d922f68ba211fcf6dbdcb6f5";
    const BASE_URL = 'https://api.themoviedb.org/3';
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Movie not found.');
        } else {
            throw new Error('Failed to fetch movie details: ' + response.statusText);
        }
    }
    const movieDetails = await response.json();
    return movieDetails;
}

    function createMovieElement(movie) {
        const element = document.createElement('div');
        element.innerHTML = `
            <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'http://via.placeholder.com/1080x1500'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        return element;
    }

    function addMovieToWatched(movieId) {
        if (!watchedMovies.includes(movieId)) {
            watchedMovies.push(movieId);
            localStorage.setItem('movie-watched', JSON.stringify(watchedMovies));
        }
    }

    function isValidMovieId(movieId) {
        return !isNaN(movieId);
    }
// });

// PAGINATION

getMovies(API_URL);

// DISPLAY MOVIE CARDS
function getMovies(url) {
    lastUrl = url;
}