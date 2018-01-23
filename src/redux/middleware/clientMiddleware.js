// import { logout } from '../modules/auth';

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, types, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        const [ REQUEST, SUCCESS, FAILURE ] = types;
        const actionPromise = promise(client);

        next({ ...rest, type: REQUEST });

        actionPromise
            .then(result => next({ ...rest, result, type: SUCCESS }))
            .catch(error => {
                if (error && error.response && error.response.status === 401) {
                    // dispatch(logout());
                }

                console.error(error);

                next({ ...rest, error, type: FAILURE });
            });

        return actionPromise;
    };
}
