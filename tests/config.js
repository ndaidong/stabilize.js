import {stabilize as es6} from '../src/main';
import {stabilize as full} from '../dist/stabilize';
import {stabilize as min} from '../dist/stabilize.min';


module.exports = {
  variants: [es6, full, min]
};
