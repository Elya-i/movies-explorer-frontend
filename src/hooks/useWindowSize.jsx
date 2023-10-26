import {useLayoutEffect, useState} from 'react';
import {deviceWidth} from '../contexts/WindowModeContext';
import {DEBOUNCE_TIME_MS} from '../utils/constants';

function debounce(f, ms) {
  let isCooldown = false;
  return function() {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

export default function useWindowSize() {
  const [screenType, setScreenType] = useState("desktop");
  const handleScreenResize = () => {
    const currentWidth = window.innerWidth
    if (currentWidth < deviceWidth.tablet) {
      setScreenType('mobile');
    } else if (currentWidth >= deviceWidth.tablet && currentWidth < deviceWidth.desktop) {
      setScreenType('tablet');
    } else if (currentWidth >= deviceWidth.desktop) {
      setScreenType('desktop');
    }
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', debounce(handleScreenResize, DEBOUNCE_TIME_MS));
    handleScreenResize();
    return () => {
      window.removeEventListener('resize', debounce(handleScreenResize, DEBOUNCE_TIME_MS));
    };
  })
  return screenType
}
