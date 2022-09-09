import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModalPage from '../../Components/ModalPage/ModalPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProjectDetailPage.css';
import ModalPageTablet from '../../Components/ModalPage/ModalPageTablet';
import { ModalMobile } from '../../Components/ModalMobile';
import { useNavigate, useLocation } from 'react-router-dom';
function differentPage(matches, matchMobile) {
  if (matchMobile) {
    return <ModalMobile />;
  } else if (matches) {
    return <ModalPageTablet />;
  } else {
    return <ModalPage />;
  }
}
export default function ProjectDetails() {
  const matches = useMediaQuery('(max-width:1000px)');
  const matchesMobile = useMediaQuery('(max-width:550px)');
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const {
    state: { res },
  } = useLocation();
  return (
    <div className="ProjectDetails__container">
      <ToastContainer autoClose={1000} position="bottom-right" />
      <Tooltip title="Go Back">
        <div className="backIcon" role="button" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="large" />
        </div>
      </Tooltip>
      {differentPage(matches, matchesMobile)}

      <div className="  ProjectDetails__contact " id="input">
        <p className="ProjectDetails__contact__header">CONTACT US</p>
        <div className="ProjectDetails__contact__input ">
          <input
            type="email"
            placeholder="you@email.com"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value, name: res.title }),
              };
              if (!value.includes('@')) {
                toast('Enter valid Email address', {
                  hideProgressBar: true,
                  style: { background: 'black', color: 'white' },
                });
                return;
              }
              fetch(
                'https://kineticcodes.pythonanywhere.com/emails/',
                requestOptions
              )
                .then((response) => response.json())
                .then((data) => {
                  setValue('');
                  console.log(data);
                  toast('Your email has been shared', {
                    hideProgressBar: true,
                    style: { background: 'black', color: 'white' },
                  });
                })
                .catch((error) => {
                  console.log(error);
                  toast('something went wrong', {
                    hideProgressBar: true,
                    style: { background: 'black', color: 'white' },
                  });
                });
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
