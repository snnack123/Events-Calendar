import { createStore, combineReducers } from 'redux'
import { usersReducer } from './users';
import { eventsReducer } from './events';

export const store = createStore(combineReducers({
    users: usersReducer,
    events: eventsReducer
}));