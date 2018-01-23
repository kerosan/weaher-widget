import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
// import {reducer as formReducer} from 'redux-form';
import locations from "./modules/locations"

export default combineReducers({
    routing: routerReducer,
    locations,
    // formReducer
})