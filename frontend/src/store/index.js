import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const OMDB_API_KEY = "b75fe950"; // Replace with your OMDb API key
const OMDB_BASE_URL = "http://www.omdbapi.com/";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [], // OMDb does not provide genre list, so this might need to be handled differently
};

// OMDb does not have a direct genres endpoint. This will need to be adapted or handled differently
export const getGenres = createAsyncThunk("netflix/genres", async () => {
  return []; // Placeholder as OMDb does not have a genre list endpoint
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = movie.Genre ? movie.Genre.split(", ") : [];
    if (movie.Poster)
      moviesArray.push({
        id: movie.imdbID,
        name: movie.Title,
        image: movie.Poster,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const { data } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(data.Search, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    // OMDb does not support filtering by genre directly, this needs to be handled differently
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${OMDB_BASE_URL}?s=${genre}&apikey=${OMDB_API_KEY}`,
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
      `${OMDB_BASE_URL}?s=${type}&apikey=${OMDB_API_KEY}`,
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
