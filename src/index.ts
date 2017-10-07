import {keyTap, keyToggle} from 'robotjs';

keyToggle('e', 'down');
keyToggle('left', 'down');
const interval = setInterval(() => {
  // keyTap('e');
}, 1);
// const interval2 = setInterval(() => {
//   keyTap('left');
// }, 1);
setTimeout(() => {
  clearInterval(interval);
  keyToggle('e', 'up');
  keyToggle('left', 'up');
  // clearInterval(interval2);
  // keyTap('shift');
  // keep the server alive
}, 3000);
console.log('Running!');