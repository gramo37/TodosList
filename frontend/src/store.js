import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";  // redux google extension
import { sampleReducer} from './redux/reducers/sampleReducer';
import { authReducer, emailReducer } from './redux/reducers/authreducers';
import { todoReducer } from './redux/reducers/todoReducer';

const reducer = combineReducers({
    sample: sampleReducer,
    auth: authReducer,
    email: emailReducer,
    todos: todoReducer
})

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;