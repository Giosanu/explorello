import firebase from "firebase/app";
import "firebase/auth";

export const SIGN_IN = "sign_in";
export const SIGN_IN_SUCCESS = "sign_in_success";
export const SIGN_IN_FAIL = "sign_in_fail";

export const signIn = (email, password) => dispatch => {
  dispatch({ type: SIGN_IN });
  const auth = firebase.auth();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
        console.log(response)
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: response.user
      });
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: SIGN_IN_FAIL,
        payload: error
      });
    });
};
