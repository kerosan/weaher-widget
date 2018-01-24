import typeToReducer from "type-to-reducer";

export const MAP_LOCATION_WEATHER_FETCH = 'MAP_LOCATION_WEATHER_FETCH';
export const MAP_LOCATION_WEATHER_SUCCESS = 'MAP_LOCATION_WEATHER_SUCCESS';
export const MAP_LOCATION_WEATHER_FAILED = 'MAP_LOCATION_WEATHER_FAILED';
export const MAP_LOCATION_WEATHER_DELETE = 'MAP_LOCATION_WEATHER_DELETE';
export const MAP_LOCATION_WEATHER_SWITCH = 'MAP_LOCATION_WEATHER_SWITCH';

const initialState = {
    places: [
        {
            key: 0,
            formatted_address: 'New York, NY, USA',
            lat: 40.7127753,
            lon: -74.0059728,
            weather: {temp: 10, pressure: 1000},
        },
        {
            key: 1,
            formatted_address: 'Toronto, OP, Canada',
            lat: 43.653226,
            lon: -79.38318429999998,
            weather: {temp: 10, pressure: 1000},
        }
    ],
    selected: 0
};

const locations = typeToReducer({
    MAP_LOCATION_WEATHER_FETCH: (state, action) => {
        action.payload.key = state.places.length;
        return {places: [...state.places, action.payload]};
    },
    MAP_LOCATION_WEATHER_SUCCESS: (state, action) => {
        let places = state.places.slice();
        for (let place of places) {
            if (place.formatted_address === action.formatted_address) {
                place.weather = {...action.weather};
                place.key = places.indexOf(place);
                break;
            }
        }
        return {...state, places};
    },
    MAP_LOCATION_WEATHER_DELETE: (state, action) => {
        let index = state.places.indexOf(action.payload);
        let places = state.places.slice();
        places.splice(index, 1);
        return {...state, places, selected: state.places[index - 1].key};
    },
    MAP_LOCATION_WEATHER_SWITCH: (state, action) => {
        return {...state, selected: action.key};
    }
}, initialState);

export const addLocationAction = ({formatted_address, lat, lon}) => (dispatch) => {
    dispatch({
        type: MAP_LOCATION_WEATHER_FETCH,
        payload: {
            formatted_address,
            lat,
            lon,
        }
    });

    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&APPID=3079ec03ae1ffcfd051beb2367f96702`)
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: MAP_LOCATION_WEATHER_SUCCESS,
                formatted_address,
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

export const deleteLocationAction = (payload) => {
    return {
        type: MAP_LOCATION_WEATHER_DELETE,
        payload
    };
};

export const setActiveTab = (payload, key) => {
    return {
        type: MAP_LOCATION_WEATHER_SWITCH,
        payload,
        key
    };
};

export default locations;