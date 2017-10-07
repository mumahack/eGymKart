import {KeyboardOutput} from './KeyboardOutput';
import {keyToggle} from 'robotjs';

export const RobotJSKeyboardOutput: KeyboardOutput = {
  keyPress: (key: string) => {keyToggle(key, 'down')},
  keyRelease: (key: string) => {keyToggle(key, 'up')}
};