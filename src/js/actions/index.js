// Setup Requests
export const SETUP_REQUESTS = 'SETUP_REQUESTS';
export function setupRequests(numberOfPackages) {
  return {
    type: SETUP_REQUESTS,
    numberOfPackages
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

export function fetchPackageSuccess(payload) {
  return {
    type: FETCH_PACKAGE_SUCCESS,
    payload
  };
};

export function fetchTokenFailure() {
  return {
    type: FETCH_PACKAGE_FAILURE
  };
};

export function fetchPackageDetails(packageDetails) {
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
      dispatch(fetchPackageSuccess(json));
    })
    .catch(error => {
      dispatch(fetchTokenFailure());
    });
  };
};
