import {createStore} from 'redux';
import {userData} from './reducer'

const store = createStore(userData);

export default store;