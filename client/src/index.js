import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
//원래는 redux에서 createStore만 하면 되는데 그냥 Store는 객체밖에 못받기 때문에 
//이를 보완 하기 위해서 redux-Promise와 thunk가 붙음

//store 초기값
ReactDOM.render(
  <Provider
    store = {createStoreWithMiddleWare(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
    <App />
  </Provider>
  ,document.getElementById('root')
);
reportWebVitals();
