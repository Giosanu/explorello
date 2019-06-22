import firebase from "firebase/app";
import "firebase/auth";
import { GoogleSignin } from "react-native-google-signin";
import { errorToast, successToast } from "../../constants/Functions";
import * as RNF from 'react-native-firebase'

export const SIGN_IN = "sign_in";
export const SIGN_IN_SUCCESS = "sign_in_success";
export const SIGN_IN_FAIL = "sign_in_fail";

export const addUserName = (username, uid, navigate) => dispatch => {
  let update = {}
  update[`users/${uid}`] = {username: username}
  RNF.database().ref().update(update, function(error) {
    if (error) {
      errorToast(`Something went wrong: ${error.message}`);
    } else {
      successToast(`Welcome, ${username}!`);
      dispatch(() => navigate("Dashboard"))
    }
  });
}

const checkUserHasUsername = (uid, navigate) => {
  RNF.database().ref(`users/${uid}`).once('value').then(function(snapshot){
    snapshot.val() ? navigate("Dashboard") : navigate("Username", {uid: uid})
  })
}

export const signIn = (email, password, navigate) => dispatch => {
  dispatch({ type: SIGN_IN });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      successToast("Welcome back, traveler.");
      checkUserHasUsername(response.user.uid, navigate)
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: {
          email: response.user.email,
          uid: response.user.uid
        }
      });
    })
    .catch(error => {
      errorToast(error.message);
      console.log(error.message)
      dispatch({
        type: SIGN_IN_FAIL,
        payload: error
      });
    });
};

const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;
export const loginFacebook = navigate => {
  return dispatch => {
    dispatch({ type: SIGN_IN });
    LoginManager.logInWithPermissions([
      "public_profile",
      "user_friends",
      "email"
    ]).then(
      result => {
        if (result.isCancelled) {
          errorToast("Whoops! You cancelled the sign in.");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(result => {
                successToast("Welcome, traveler!");
                checkUserHasUsername(result.user.uid, navigate)
                dispatch({
                  type: SIGN_IN_SUCCESS,
                  payload: {
                    email: result.user.email,
                    uid: result.user.uid
                  }
                });
              })
              .catch(error => {
                errorToast(error.message);
                dispatch({
                  type: SIGN_IN_FAIL,
                  payload: error
                });
              });
          });
        }
      },
      error => {
        errorToast(error.message);
        dispatch({
          type: SIGN_IN_FAIL,
          payload: error
        });
      }
    );
  };
};

export const loginGoogle = (navigate) => {
  return dispatch => {
    GoogleSignin.configure({
      webClientId:
        "106475628676-kr520n13v2reg870l3qi19tromgmf32g.apps.googleusercontent.com"
    });
    dispatch({
      type: SIGN_IN
    });
    GoogleSignin.signIn()
      .then(data => {
        console.log("Login google: ", data);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(result => {
        successToast("Welcome, traveler!");
        checkUserHasUsername(result.user.uid, navigate)
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            email: result.user.email,
            uid: result.user.uid
          }
        });
      })
      .catch(error => {
        errorToast(error.message);
        dispatch({
          type: SIGN_IN_FAIL,
          payload: error
        });
      });
  };
};
