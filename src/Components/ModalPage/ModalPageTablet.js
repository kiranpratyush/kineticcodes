import React from 'react';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import Rating from '@mui/material/Rating';
import './ModalPageTablet.css';
import { Link } from 'react-scroll';
import Tooltip from '@mui/material/Tooltip';
import { datas } from './data';
import { useLocation } from 'react-router-dom';
export default function ModalPageTablet() {
  const [images, setImage] = React.useState(0);
  const {
    state: { res },
  } = useLocation();
  return (
    <div className="ModalPageTablet__container">
      <main className="ModalPageTablet__main">
        <div className="ModalPageTablet__main__image">
          <img src={res.images[images].images} alt="" />
          <div className="ModalPage__main__favorite">
            <Tooltip title="Learn More">
              <div>
                <Link activeClass="active" to="input" smooth={true} spy={true}>
                  <FavoriteBorderSharpIcon fontSize="medium" />
                </Link>
              </div>
            </Tooltip>
          </div>
        </div>
        <aside className="ModalPageTablet__aside">
          {res.images.map((image, index) => (
            <div
              className="modalpagesmallimage__container"
              key={index}
              role="button"
              onClick={() => {
                console.log(index, image);
                setImage(index);
              }}
            >
              <div
                className={index === images ? 'ModalPage__overlay' : ''}
              ></div>
              <img src={image.images} alt="" />
            </div>
          ))}
        </aside>
        <div className="ModalPageTablet__categories">
          <div className="ModalPage__category__name underline ">Technology</div>
          <div className="ModalPage__badgecontainer">
            {res.techStack.map((element, index) => (
              <span className="ModalPage__badge" key={index}>
                {element.tech}
              </span>
            ))}
          </div>
        </div>
        <div className="ModalPageTablet__categories">
          <div className="ModalPage__category__name underline">
            Management Tools
          </div>
          <div className="ModalPage__badgecontainer">
            {res.managementTools.map((element, index) => (
              <span className="ModalPage__badge" key={index}>
                {element.managementTool}
              </span>
            ))}
          </div>
        </div>
      </main>
      <article className="ModalPage__details">
        <div className="ModalPage__tags">
          {res.tags.map((element, index) => (
            <span className="ModalPags__tags__badge" key={index}>
              {element}
            </span>
          ))}
        </div>
        <p className="ModalPage__header">{res.title}</p>
        <p className="ModalPage__subheader">{res.context}</p>
        {/* <div className="ModalPage__customerreview__container">
          <Rating value="3" sx={{ color: 'rgb(8, 60, 174)' }} readOnly />
          <p>3/5</p>
        </div> */}

        <div className="ModalPage__maindetails">
          <p className="ModalPage__about underline">About the Project</p>
          <p className="ModalPageTablet__productdetails">{res.subtitle}</p>
        </div>
      </article>
    </div>
  );
}
