import React from 'react';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import './ScrolltoTop.css';
export function ScrollToTop() {
  const [showButton, setButton] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setButton(true);
      } else {
        setButton(false);
      }
    });
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };
  return (
    <div className="scroll_totop" roll="button" onClick={scrollToTop}>
      {showButton && (
        <Tooltip title="Move to top" placement="top">
          <Fab role="button">
            <KeyboardArrowUpOutlinedIcon />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
}
