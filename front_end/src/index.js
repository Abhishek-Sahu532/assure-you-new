import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store.js'
import { BrowserRouter } from "react-router-dom";
import {positions, transitions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options ={
  timeout: 1000,
  positions: positions.TOP_LEFT,
  transitions: transitions.FADE,
  offset: '14px'
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
