import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Correct the import statement

import Netflix from './pages/Netflix';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Player from './pages/Player';
import Movie from './pages/Movies';
import TVShows from './pages/TVShows';
import UserListedMovies from './pages/UserListedMovies';

export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/movies" element={<Movie />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  );
}
