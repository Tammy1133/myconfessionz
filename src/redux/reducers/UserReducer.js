import { ActionTypes } from "../constant/actiontypes";

const initialState = {
  user: { user: { user: { usercode: undefined } } },
  token: undefined,
  comments: [],
  counsellorcomments: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionTypes.SET_COUNSELLOR_COMMENTS:
      return {
        ...state,
        counsellorcomments: action.payload,
      };
    default:
      return state;
  }
};
