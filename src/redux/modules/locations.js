import typeToReducer from "type-to-reducer";

const MAP_LOCATION_WEATHER_FETCH = 'MAP_LOCATION_WEATHER_FETCH';
const MAP_LOCATION_WEATHER_SUCCESS = 'MAP_LOCATION_WEATHER_SUCCESS';
const MAP_LOCATION_WEATHER_FAILED = 'MAP_LOCATION_WEATHER_FAILED';
const MAP_LOCATION_WEATHER_DELETE = 'MAP_LOCATION_WEATHER_DELETE';

const initialState = {
    places: [
        {
            formatted_address: 'New York, NY, USA',
            lat: 40.7127753,
            lon: -74.0059728,
            weather: {temp: 0, pressure: 100},
        },
        {
            formatted_address: 'Toronto, OP, Canada',
            lat: 43.653226,
            lon: -79.38318429999998,
            weather: {temp: 0, pressure: 100},
        }
    ],
};
const locations = typeToReducer({
    MAP_LOCATION_WEATHER_FETCH: (state, action) => {
        return {places: [...state.places, action.payload]};
    },
    MAP_LOCATION_WEATHER_SUCCESS: (state, action) => {
        let places = state.places.slice();
        for (let place of places) {
            if (place.formatted_address === action.formatted_address) {
                place.weather = {...action.weather};
                break;
            }
        }
        return {...state, places: places};
    },
    MAP_LOCATION_WEATHER_DELETE: (state, action) => {
        let index = state.places.indexOf(action.payload);
        let places = state.places.slice();
        places.splice(index,1);
        return {...state, places};
    }
}, initialState);

export const addLocationAction = (place) => (dispatch) => {


    dispatch({
        type: MAP_LOCATION_WEATHER_FETCH,
        payload: {
            formatted_address: place['formatted_address'],
            lat: place.lat,
            lon: place.lon,

        }
    });

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${place.lat}&lon=${place.lon}&APPID=3079ec03ae1ffcfd051beb2367f96702`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch({
                type: MAP_LOCATION_WEATHER_SUCCESS,
                formatted_address: place['formatted_address'],
                weather: res.main,
            });
        })
        .catch(err => {
            console.error(`Fetch weather failed! ${err}`);

            dispatch({
                type: MAP_LOCATION_WEATHER_FAILED,
                errorCode: 100500,
            });
        })

};
export const deleteLocationAction = (tab) => {

    return {
        type: MAP_LOCATION_WEATHER_DELETE,
        payload: tab
    };
};

export default locations;