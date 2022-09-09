import React from 'react';
import './ImageCard.css';
import VideoPopup from '../VideoPopup/VideoPopup';
function addClassName(props) {
  let className = 'ImageCard__container';
  if (props.feat) {
    className = className + ' feat';
  }
  if (props.down) {
    className = className + ' down';
  }
  return className;
}
export default function ImageCard(props) {
  const [close, setClose] = React.useState(true);
  const id = props.url.split("?")[1].slice(2)
  const thumbnail = `https://img.youtube.com/vi/${id}/0.jpg`
  return (
    <>
      <VideoPopup close={close} setClose={setClose} url={props.url} description ={props.description} title = {props.title}/>
      <div
        className={addClassName(props)}
        role="button"
        onClick={() => {
          console.log('i');
          setClose(false);
        }}
      >
        {' '}
        <div className="ImageCard__header">
          <div className="ImageCard__header__image">
            <img
              src="https://www.kineticcodes.com/assets/images/favicon.png"
              alt=""
            ></img>
          </div>
          <span>Kinetic codes</span>
        </div>
        <div className="ImageCard__image">
          <img src={props.thumbnail||thumbnail} alt=" "></img>
        </div>
        <div className="ImageCard__title">
          <p>{props.title}</p>
          <span className="ImageCard__subtitle">{props.subtitle}</span>
        </div>
      </div>
    </>
  );
}
