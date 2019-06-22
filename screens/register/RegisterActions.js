import firebase from "firebase/app";
import "firebase/auth";
import { errorToast, successToast } from "../../constants/Functions";

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_success";
export const REGISTER_FAIL = "REGISTER_fail";

export const register = (email, password, confirmPassword, navigate) => dispatch => {
  dispatch({ type: REGISTER });
  if (password !== confirmPassword) {
    errorToast("Passwords do not match!");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log("register success: ", response);
        successToast("You've registered successfully.")
        dispatch({
          type: REGISTER_SUCCESS
        });
        dispatch(() => navigate("Dashboard"));
      })
      .catch(error => {
        errorToast(error.message)
        dispatch({
          type: REGISTER_FAIL,
          payload: error
        });
      });
  }
};
