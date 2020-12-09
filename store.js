// store.js

import { createStore, combineReducers } from "redux";
import { usersReducer, filterUsersReducer, toFilterUsersReducer } from "./source/redux/reducers/reducers";

const rootReducer = combineReducers({
  users: usersReducer,
  filteredUsers: filterUsersReducer,
  toFilter: toFilterUsersReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
