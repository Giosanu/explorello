import { GoogleApiKey } from "../../config/keys";

export const FETCH_GOOGLE_MAP = "fetch_google_map";
export const FETCH_GOOGLE_MAP_SUCCESS = "fetch_google_map_success";
export const FETCH_GOOGLE_MAP_FAIL = "fetch_google_map_fail";

export const fetchLatLngByPlaceId = placeId => dispatch => {
  dispatch({ action: FETCH_GOOGLE_MAP });
  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GoogleApiKey}`
  )
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ action: FETCH_GOOGLE_MAP_SUCCESS, payload: responseJson });
    });
};
