import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
// <<<<<<< HEAD

const OMDB_API_KEY = "b75fe950"; // Replace with your OMDb API key
const OMDB_BASE_URL = "http://www.omdbapi.com/";
// =======
// import { API_KEY, TMDB_BASE_URL } from "../utils/constants";
// >>>>>>> origin/main

const initialState = {
  movies: [],
  genresLoaded: false,
  // <<<<<<< HEAD
  genres: [], // OMDb does not provide genre list, so this might need to be handled differently
};

// OMDb does not have a direct genres endpoint. This will need to be adapted or handled differently
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  return []; // Placeholder as OMDb does not have a genre list endpoint
  // =======
  //   genres: [],
  // };

  // export const getGenres = createAsyncThunk("netflix/genres", async () => {
  //   const {
  //     data: { genres },
  //   } = await axios.get(
  //     "https://api.themoviedb.org/3/genre/movie/list?api_key=3d39d6bfe362592e6aa293f01fbcf9b9"
  //   );
  //   return genres;
  // // >>>>>>> origin/main
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    // <<<<<<< HEAD
    const movieGenres = movie.Genre ? movie.Genre.split(", ") : [];
    if (movie.Poster)
      moviesArray.push({
        id: movie.imdbID,
        name: movie.Title,
        image: movie.Poster,
        // =======
        // const movieGenres = [];
        // movie.genre_ids.forEach((genre) => {
        //   const name = genres.find(({ id }) => id === genre);
        //   if (name) movieGenres.push(name.name);
        // });
        // if (movie.backdrop_path)
        //   moviesArray.push({
        //     id: movie.id,
        //     name: movie?.original_name ? movie.original_name : movie.original_title,
        //     image: movie.backdrop_path,
        // >>>>>>> origin/main
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    // <<<<<<< HEAD
    const { data } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(data.Search, moviesArray, genres);
    // =======
    //     const {
    //       data: { results },
    //     } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    //     createArrayFromRawData(results, moviesArray, genres);
    // >>>>>>> origin/main
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    // <<<<<<< HEAD
    // OMDb does not support filtering by genre directly, this needs to be handled differently
    // =======
    // >>>>>>> origin/main
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      // <<<<<<< HEAD
      `${OMDB_BASE_URL}?s=${genre}&apikey=${OMDB_API_KEY}`,
      // =======
      //       `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      // >>>>>>> origin/main
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      // <<<<<<< HEAD
      `${OMDB_BASE_URL}?s=${type}&apikey=${OMDB_API_KEY}`,
      // =======
      //       `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      // >>>>>>> origin/main
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export const { setGenres, setMovies } = NetflixSlice.actions;
