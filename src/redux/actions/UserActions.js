import { useState } from "react";
import { ActionTypes } from "../constant/actiontypes";

export const setUser = (data) => {
  return {
    type: ActionTypes.SET_USER,
    payload: data,
  };
};

export const setCommentss = (data) => {
  return {
    type: ActionTypes.SET_COMMENTS,
    payload: data,
  };
};
export const setCounsellorComments = (data) => {
  return {
    type: ActionTypes.SET_COUNSELLOR_COMMENTS,
    payload: data,
  };
};
