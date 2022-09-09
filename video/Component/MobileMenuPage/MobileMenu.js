import React from 'react';
import './MobileMenu.css';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
function className({ close, mode }) {
  let className = 'MobileMenu__container';
  if (close) {
    className += ' hide';
  } else {
    className += ' onvalue';
  }
  // if (mode) {
  //   className += ' dark';
  // } else {
  //   className += ' light';
  // }
  return className;
}
export default function MobileMenu({ close, mode, setClose }) {
  return (
    <div className={className({ close, mode })}>
      <div className="MobileMenu__header__container">
        <p className="MobileMenu__header">Categories</p>
        <span className="MobileMenu__line"></span>
        <div
          className="MobileMenu__icon"
          role="button"
          onClick={() => setClose(true)}
        >
          <CloseSharpIcon fontSize="large" />
        </div>
      </div>
      <div className="MobileMenu__categories" role="button">
        <span>App design</span>
        <span>Web design</span>
        <span>Web devlopment</span>
        <span>Block chain</span>
      </div>
    </div>
  );
}
