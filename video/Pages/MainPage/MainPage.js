import React from 'react';
import NavBar from '../../Component/NavBar/NavBar';
import VideoList from '../../Component/videoList/VideoList';
import './MainPage.css';
export default function MainPage({ setMode, mode }) {
  return (
    <>
      <div className="main__page">
        {/* <NavBar mode={mode} setMode={setMode} /> */}
        <VideoList />
      </div>
    </>
  );
}
