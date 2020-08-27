import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import postsReducer from './reducers/post';
import messageReducer from './reducers/message';

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    message: messageReducer
});

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)));
}

export default storeConfig;
