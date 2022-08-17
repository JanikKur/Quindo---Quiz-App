import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import '../assets/styles/loading.css';

export default function LoadingScreen({fullscreen}) {
  return (
    <div><AiOutlineLoading3Quarters className={`loading ${fullscreen ? 'fullscreen' : ''}`}/></div>
  )
}
