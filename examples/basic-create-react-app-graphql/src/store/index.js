import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

export default () => {
    const logger = createLogger({
        level: 'info',
        collapsed: true
    });
    return createStore(
        rootReducer,
        applyMiddleware(logger)
    );
}
