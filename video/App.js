import './App.css';
import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
// The dark mode is currently controlled by Javascript contact me for better info
// After all consideration I'll remove the react code till then don't remove it, it may break code

function App() {
  const [dark, setDark] = React.useState(false);
  return (
    <div>
      <MainPage setMode={setDark} mode={dark} />
    </div>
    // <MobileMenu />
    // <VideoPopup />
  );
}

export default App;
