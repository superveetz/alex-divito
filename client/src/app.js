import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'vide';
import 'async';
import angular             from 'angular';

import uiRouter             from 'angular-ui-router';

import Config               from './Config.js';
import Runners              from './Runners.js';

//app js
import Controllers          from './js/controllers/app.controllers';
import Services             from './js/services/app.services';
import Directives           from './js/directives/app.directives';

// vendor css
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
// themes css
import './css/startbootstrap-coming-soon.css';
import './css/startbootstrap-resume.css';
// sass
import './sass/main.scss';
import './sass/main-nav/main-nav.scss';
import './sass/view-transitions/view-transitions.scss';


const appname = 'app';  /** App and root module name */
const deps    = [ /** All global dependencies */
    'ui.router', 
    'app.controllers',
    'app.services',
    'app.directives'
]; 
// const modules = [Controllers];  /** All app dependencies */
const modules = [];

angular.module(appname, deps.concat(modules)).config(Config).run(Runners); // Declare root module 
angular.bootstrap(document, [appname]); // bootstrap our application

/** Export appname. Just in case. */
export default appname;