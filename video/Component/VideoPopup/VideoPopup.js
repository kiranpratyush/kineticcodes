import React from 'react';
import ReactPlayer from 'react-player/youtube';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import './VideoPopup.css';
export default function VideoPopup({
  close,
  setClose,
  url,
  description,
  title,
}) {
  React.useEffect(() => {
    console.log(close);
    if (!close) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [close]);
  if (close) {
    return null;
  }

  return (
    <div className="videopopup__container">
      <div className="videopopup__details">
        <div className="videopopup__image__details">
          <div>
            <img
              src="https://www.kineticcodes.com/assets/images/favicon.png"
              alt=""
            ></img>
          </div>
          <span>kinetic codes</span>
        </div>
        <p className="videopopup__title">{title}</p>
        <p className="videopopup__description">Descriptions:</p>
        <p className="videopopup__subtitle">{description}</p>
        {/* <p className="videopopup__description">Overview:</p>
        <p className="videopopup__subtitle">
          A paragraph is a series of sentences that are organized and coherent,
          and are all related to a single topic. Almost every piece of writing
          you do that is longer than a few sentences should be organized into
          paragraphs. This is because paragraphs show a reader where the
        </p> */}
      </div>
      <div className="videopopup">
        <ReactPlayer
          url={url || 'https://www.youtube.com/watch?v=hKSB37kB0zI'}
          height="100%"
          width="100%"
          controls={true}
        />
      </div>
      <span
        className="videopopup__close"
        role="button"
        onClick={() => {
          setClose(true);
        }}
      >
        <CloseSharpIcon fontSize="large" />
      </span>
    </div>
  );
}
