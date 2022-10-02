import { USER_ACTION_TYPES } from './user.types';
import { getCategoriesAndDocuments, getUserCartItems } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from '../categories/category.action';

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
