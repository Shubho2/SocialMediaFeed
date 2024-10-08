import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';


import "./index.css";
import reducers from "./reducers";
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </React.StrictMode>
    </Provider>
);
