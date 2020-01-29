import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducer';

const logger = createLogger();

const store = createStore(reducer, compose(applyMiddleware(logger)));

export default store;
