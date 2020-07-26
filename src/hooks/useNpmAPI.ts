import { useEffect, useReducer } from 'react';
import axios from 'axios';

interface State {
  packageJSON: PackageJSON;
  isLoading: boolean;
  isError: boolean;
  data: any;
}

type Action =
  | { type: typeof SET_INITIAL_DATA; data: any }
  | { type: typeof FETCH_PACKAGES_REQUEST }
  | { type: typeof FETCH_PACKAGES_SUCCESS; payload: any }
  | { type: typeof FETCH_PACKAGES_FAILURE };

interface PackageJSON {
  name: string;
  dependencies: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';
const FETCH_PACKAGES_REQUEST = 'FETCH_PACKAGES_REQUEST';
const FETCH_PACKAGES_SUCCESS = 'FETCH_PACKAGES_SUCCESS';
const FETCH_PACKAGES_FAILURE = 'FETCH_PACKAGES_FAILURE';

const initialState: State = {
  packageJSON: {
    name: null,
    dependencies: {},
    devDependencies: {},
  },
  isLoading: false,
  isError: false,
  data: null,
};

const dataFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_INITIAL_DATA:
      return {
        ...initialState,
        packageJSON: action.data,
      };
    case FETCH_PACKAGES_REQUEST:
      return {
        ...initialState,
        isLoading: true,
        isError: false,
      };
    case FETCH_PACKAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case FETCH_PACKAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const getPackageNames = (packageJSON): string[] => {
  const dependencies = Object.keys(packageJSON.dependencies || {}) || [];
  const devDependencies = Object.keys(packageJSON.devDependencies || {}) || [];
  return [...dependencies, ...devDependencies];
};

export const useNpmAPI = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const packages = getPackageNames(state.packageJSON);

      if (!packages.length) {
        return;
      }

      try {
        const response = await axios.post('/api/npm', { packages });
        const payload = response.data.reduce((memo, item) => {
          return {
            ...memo,
            [item.name]: item,
          };
        }, {});

        dispatch({
          type: FETCH_PACKAGES_SUCCESS,
          payload,
        });
      } catch (err) {
        dispatch({ type: FETCH_PACKAGES_FAILURE });
      }
    };

    fetchData();
  }, [
    JSON.stringify(state.packageJSON.dependencies),
    JSON.stringify(state.packageJSON.devDependencies),
  ]);

  return [state, dispatch];
};
