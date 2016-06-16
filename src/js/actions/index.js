import { compareVersionNumbers, getStatus } from '../utils/versionStatus';

// Setup Requests
export const SETUP_REQUESTS = 'SETUP_REQUESTS';
export function setupRequests(numberOfPackages, payload) {
  return {
    type: SETUP_REQUESTS,
    numberOfPackages,
    projectName: payload.name,
    version: payload.version
  };
}

export const FETCH_PACKAGE_REQUEST = 'FETCH_PACKAGE_REQUEST';
export const FETCH_PACKAGE_SUCCESS = 'FETCH_PACKAGE_SUCCESS';
export const FETCH_PACKAGE_FAILURE = 'FETCH_PACKAGE_FAILURE';

export function fetchPackageRequest() {
  return {
    type: FETCH_PACKAGE_REQUEST
  };
}

export function fetchPackageSuccess(isDependency, requiredVersion, name, status, payload) {
  return {
    type: FETCH_PACKAGE_SUCCESS,
    name,
    isDependency,
    requiredVersion,
    status,
    payload
  };
};

export function fetchTokenFailure(isDependency, requiredVersion, name) {
  return {
    type: FETCH_PACKAGE_FAILURE,
    name,
    isDependency,
    requiredVersion
  };
};

export function fetchPackageDetails(packageDetails) {
  const {name, isDependency, requiredVersion} = packageDetails;

  return (dispatch, getState) => {
    dispatch(fetchPackageRequest());

    return fetch(`https://salty-bayou-6454.herokuapp.com/${packageDetails.name}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      const checkStatus = compareVersionNumbers(requiredVersion, json['dist-tags'].latest);
      const packageStatus = getStatus(checkStatus);
      dispatch(fetchPackageSuccess(isDependency, requiredVersion, name, packageStatus, json));
    })
    .catch(error => {
      dispatch(fetchTokenFailure(isDependency, requiredVersion, name));
    });
  };
};
