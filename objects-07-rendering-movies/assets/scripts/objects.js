const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  filtered_movies = (!filter ? movies : movies.filter(movie => movie.info.title.includes(filter)))

  filtered_movies.forEach((movie) => {
    const movieEl = document.createElement('li');
    let desc = movie.info.title + '-';
    
    for (const key in movie.info) {
      if(key != 'title' && key!= '_title') {
          desc = desc + `${key} : ${movie.info[key]}`
      }
    }
    movieEl.textContent = desc;
    movieList.append(movieEl);
  });
};

const filterMovieHandler = () => {

  const filter = document.getElementById('filter-title').value ;
  
  renderMovies(filter);

}

const addMovieHandler = () => {


  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;


  if (
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }
  

  const newMovie = {
    info: {
      get title() {
        return this._title;
      },
      set title(name) {
      if(name.trim() == ''){
        this._title = 'DEFAULT'
      } else {
        this._title = name
      }
       
      },
      [extraName]: extraValue
    },
    id: Math.random()
  };

  
  newMovie.info.title = document.getElementById('title').value;
  
 

  movies.push(newMovie);
  renderMovies();
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click',filterMovieHandler);
