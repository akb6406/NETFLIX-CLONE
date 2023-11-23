import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from "react-icons/bs"
import video from "../assets/video.mkv"
import { useNavigate } from 'react-router-dom'
export default function Player() {
  const nevigate= useNavigate();
  return (
    <Container>
   <div className='player'>
    <div className='back'>
      <BsArrowLeft onClick={()=> nevigate(-1)} />
    </div>
    <video src={video} autoPlay loop controls muted></video>
   </div>
    
    </Container>
  )
}

const Container= styled.div`
.player{
  width:auto;
  height:auto;
  .back{
    position:absolute;
    padding:2rem;
    z-index:1;
   svg{
    font-size:3rem;
    cursor:pointer;
   }
  }
  video{
    height:100%;
    widht:100%
    object-fit:cover; 
  }
}
`;
