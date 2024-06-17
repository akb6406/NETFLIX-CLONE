// <<<<<<< HEAD
import React, { useState, useEffect } from "react";
// =======
// import React, { useState } from "react";
// >>>>>>> origin/main
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/video.mp4";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  // <<<<<<< HEAD
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
  }, [navigate]);
  // =======
  //   onAuthStateChanged(firebaseAuth, (currentUser) => {
  //     if (currentUser) {
  //       setEmail(currentUser.email);
  //     } else navigate("/login");
  //   });
  // >>>>>>> origin/main

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        // <<<<<<< HEAD
        src={movieData.image}
        // =======
        //         src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        // >>>>>>> origin/main
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              // <<<<<<< HEAD
              src={movieData.image}
              // =======
              //               src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              // >>>>>>> origin/main
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay={true}
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {/* <<<<<<< HEAD */}
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                  // =======
                  //                 {movieData.genres.map((genre) => (
                  //                   <li>{genre}</li>
                  // >>>>>>> origin/main
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  // <<<<<<< HEAD
  width: 230px;
  height: 345px; /* Set a fixed height to maintain uniformity */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  // =======
  //   max-width: 230px;
  //   width: 230px;
  //   height: 100%;
  //   cursor: pointer;
  //   position: relative;
  // >>>>>>> origin/main
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    // <<<<<<< HEAD
    object-fit: cover;
    // =======
    // >>>>>>> origin/main
    z-index: 10;
  }
  .hover {
    z-index: 99;
    // <<<<<<< HEAD
    height: 345px; /* Match the fixed height */
    width: 230px; /* Match the fixed width */
    position: absolute;
    top: 0;
    // =======
    //     height: max-content;
    //     width: 20rem;
    //     position: absolute;
    //     top: -18vh;
    // >>>>>>> origin/main
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      // <<<<<<< HEAD
      .name {
        margin: 0;
      }
      // =======
      // >>>>>>> origin/main
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        // <<<<<<< HEAD
        font-size: 1.5rem;
        // =======
        //         font-size: 2rem;
        // >>>>>>> origin/main
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        // <<<<<<< HEAD
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        // =======
        //         gap: 1rem;
        // >>>>>>> origin/main
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
