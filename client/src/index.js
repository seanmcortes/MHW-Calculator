import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hitzone from './components/Hitzone'
import Calculator from './components/Calculator'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
