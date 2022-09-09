import React from 'react';
import { ModalSliderImage } from './ImageSlider';
import './ModalMobile.css';
import Rating from '@mui/material/Rating';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { Link } from 'react-scroll';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
export function ModalMobile(props) {
  const [pressed, setPressed] = React.useState(false);
  const {
    state: { res },
  } = useLocation();
  return (
    <div className="mobilemodal__container">
      <div
        className="mobilemodal__images"
        style={
          pressed
            ? { display: 'none', transition: 'all 0.5s ease 0.5s' }
            : { display: 'inherit' }
        }
      >
        <ModalSliderImage images={res.images}></ModalSliderImage>
      </div>
      <div
        className="mobilemodal__contents"
        style={pressed ? { marginTop: '40px' } : null}
      >
        <p className="mobilemodal__title">{res.title}</p>
        <p className="mobilemodal__application">{res.context}</p>
        {/* <div className="mobilemodal__ratingContainer">
          <Rating value="3" sx={{ color: 'rgb(8, 60, 174)' }} readOnly />
          <p>3/5</p>
        </div> */}
        <div className="mobilemodal__tags__container">
          {res.tags.map((tag) => (
            <span className="mobilemodal__tags__badge" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div
          className="mobilemodal__subtitle"
          style={pressed ? { maxHeight: 'inherit' } : null}
        >
          <p
            style={
              pressed
                ? {
                    overflow: 'inherit',
                    display: 'inherit',
                    transition: 'all 1s',
                  }
                : null
            }
          >
            {res.subtitle}
          </p>
          <button
            className="mobilemodal__readmore"
            onClick={() => setPressed((pressed) => !pressed)}
          >
            {pressed ? 'Read less' : 'Read more'}
          </button>
        </div>
        <div className="mobilemodaltool__container">
          <span className="mobilemodaltool__span">Management Tool</span>
          <div className="mobilemodal__tools">
            {res.managementTools.map(({ managementTool }) => (
              <span className="mobilemodal__badge">{managementTool}</span>
            ))}
          </div>
        </div>
        <div className="mobilemodaltool__container">
          <span className="mobilemodaltool__span">Technology</span>
          <div className="mobilemodal__tools">
            {res.techStack.map(({ tech }) => (
              <span className="mobilemodal__badge">{tech}</span>
            ))}
          </div>
        </div>
        <p className="mobilemodal__completion">
          {' '}
          Completion Time : {res.time} months
        </p>
      </div>
      <div className="mobileModalPage__main__favorite">
        <Tooltip title="Learn More">
          <div>
            <Link activeClass="active" to="input" smooth={true} spy={true}>
              <FavoriteBorderSharpIcon fontSize="medium" />
            </Link>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
