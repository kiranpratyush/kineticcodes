import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import './Card.css';
export function Card(props) {
  const navigate = useNavigate();
  React.useEffect(() => {
    AOS.init({ duration: 1000, disable: () => window.innerWidth > 612 });
  }, [window]);
  return (
    <>
      <div
        data-aos="fade"
        className="main"
        onClick={() => {
          console.log('I am running');
          navigate('/modal', { state: { res: props.res } });
        }}
      >
        <div className="main__image">
          <img src={props.main[0].images} alt="main header"></img>
        </div>

        <div className="main__header">
          <h2 className="card__main__title">{props.title}</h2>
          <p className="main__subtitle">{props.res.subtitle}</p>
        </div>
        <div className="card__container">
          <span>Tools</span>
          <div className="main__tech">
            {props.image.map(({ image, tech, managementTool }) => (
              <span className=" card__badges">{tech || managementTool}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
