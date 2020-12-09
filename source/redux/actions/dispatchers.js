import { USERS, SEARCH_USERS, TO_FILTER } from "./types";

export const addUsers = (users) => {
  return {
    type: USERS,
    payload: users,
  };
};
export const filterUsers = (users) => {
  return {
    type: SEARCH_USERS,
    payload: users,
  };
};
export const toFilterUsers = (types) => {
  return {
    type: TO_FILTER,
    payload: types,
  };
};
