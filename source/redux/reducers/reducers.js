// reducers.js

import { USERS, SEARCH_USERS, TO_FILTER } from "../actions/types";

const initialState = {
  users: [],
  filteredUsers: [],
  toFilter: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export const filterUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        filteredUsers: action.payload,
      };
    default:
      return state;
  }
};
export const toFilterUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TO_FILTER:
      return {
        ...state,
        toFilter: action.payload,
      };
    default:
      return state;
  }
};
