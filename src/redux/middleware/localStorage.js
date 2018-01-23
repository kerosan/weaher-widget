import _ from 'lodash'

export default function localStorageMiddleware(key) {
    return (getState) => next => action => {
        const previousState = {...getState()};

        const result = next(action);

        const nextState = {...getState()};

        if (!_.isEqual(previousState, nextState)) {
            const storageValue = JSON.stringify(nextState);
            window.localStorage.setItem(key, storageValue)
        }

        return result;
    }
}