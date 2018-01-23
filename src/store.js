import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reducers from './redux/combineReducer'
// import clientMiddleware from "./redux/middleware/clientMiddleware";
// import apiClient from './helpers/apiClient';
// import localStorage from './redux/middleware/localStorage';
import {createLogger} from "redux-logger";

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';


export const history = createHistory();

// const initialState = {};
const enhancers = [];
// const middleware = [
//     thunk,
//     createLogger(),
//     routerMiddleware(history),
//     // clientMiddleware(apiClient)
// ];
// let finalCreateStore = applyMiddleware(...middleware)(createStore);

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

// const composedEnhancers = compose(
//     applyMiddleware(...middleware),
//     ...enhancers
// );

// const store = finalCreateStore(
//     reducers,
//     composedEnhancers
// );
const reducer = storage.reducer(reducers);
const engine = createEngine('weather');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware,thunk, createLogger(), routerMiddleware(history))(createStore);
const store = createStoreWithMiddleware(reducer);

// const store = createStore(reducers, applyMiddleware(thunk, createLogger(), routerMiddleware(history)));
const load = storage.createLoader(engine);
load(store);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

export default store