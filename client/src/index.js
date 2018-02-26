import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Raleway', 'sans-serif']
  }
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
