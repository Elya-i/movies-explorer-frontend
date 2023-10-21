import {createContext} from 'react';
import {DESKTOP_RESOLUTION, MOBILE_RESOLUTION, TABLET_RESOLUTION} from '../utils/constants';

export const WindowModeContext = createContext('desktop');
export const deviceWidth = {
  desktop: DESKTOP_RESOLUTION,
  tablet: TABLET_RESOLUTION,
  mobile: MOBILE_RESOLUTION
}