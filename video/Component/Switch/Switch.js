import React from 'react';
import './Switch.css';
import Moon from '../MoonIcon/Moon';
import Sun from '../SunIcon/SunIcon';
export default function Switch({ mode }) {
  return (
    <div className={mode ? 'switch on' : 'switch off'}>
      <span>{mode ? <Moon/> : <Sun/>}</span>
      <button></button>
    </div>
  );
}
