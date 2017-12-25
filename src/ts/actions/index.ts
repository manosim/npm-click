import axios from 'axios';
import { fromJS } from 'immutable';
import constants from '../../js/utils/constants';

export function makeAsyncActionSet(actionName: string) {
  return {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
  };
}

export const SET_FILE_ERROR = 'SET_FILE_ERROR';
export function setFileError(error: string) {
  return {
    type: SET_FILE_ERROR,
    error,
  };
}

export const FETCH_PACKAGES = makeAsyncActionSet('FETCH_PACKAGES');
export function fetchPackagesDetails(packages: [any], projectDetails: any) {
  return (dispatch: any, getState: any) => {
    dispatch({ type: FETCH_PACKAGES.REQUEST, packages: fromJS(packages), projectDetails });

    function prepareRequests() {
      return packages.map((obj: { name: string }) =>
        axios({
          baseURL: `${constants.API_URL}`,
          url: `/${obj.name}`,
          method: 'GET',
          validateStatus: (status: number) =>
            (status >= 200 && status < 300) || status === 404,
        })
      );
    }

    return axios
      .all([...prepareRequests()])
      .then(
        axios.spread(function(...payload) {
          return dispatch({
            type: FETCH_PACKAGES.SUCCESS,
            payload: fromJS(payload),
          });
        })
      )
      .catch((e: any) => {
        console.log(e);
        return dispatch({ type: FETCH_PACKAGES.FAILURE });
      });
  };
}
