import React from 'react';
import './NavBar.css';
import Switch from '../Switch/Switch';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import MobileMenu from '../MobileMenuPage/MobileMenu';
export default function NavBar({ mode, setMode }) {
  const [close, setClose] = React.useState(true);
  return (
    <div className="NavBar__container">
      <MobileMenu close={close} mode={mode} setClose={setClose} />
      <div
        className="NavBar__mobile__menu"
        role="button"
        onClick={() => {
          setClose(false);
        }}
      >
        <MenuSharpIcon
          fontSize="large"
          style={{ color: 'var(--color-font)' }}
        />
      </div>
      <div className="NavBar__values">
        <button className="tt">All</button>
        <button>Web Design</button>
        <button>Video Projects</button>
        <button>Side Projects</button>
        <button>About us</button>
      </div>
      {/* <div
        className="NavBar__modes "
        role="button"
        onClick={() => {
          setMode((mode) => !mode);
        }}
      >
        <span>Dark mode</span>
        <Switch mode={mode} />
      </div> */}
    </div>
  );
}
