import { Map, List } from 'immutable';
import * as compareVersions from 'compare-versions';

import { FETCH_PACKAGES } from '../../ts/actions';

const initialState = Map({
  isFetching: false,
  errored: false,
  packages: List(),
  response: List(),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PACKAGES.REQUEST:
      return initialState
        .set('isFetching', true)
        .set('packages', action.packages);

    case FETCH_PACKAGES.SUCCESS:
      const data = action.payload.map(obj => {
        const packageName = obj
          .getIn(['config', 'url'])
          .replace(obj.getIn(['config', 'baseURL']), '');

        const requiredVersion = state
          .get('packages')
          .find(item => {
            return item.get('name') === packageName;
          })
          .get('requiredVersion', '');

        const hasVersion = obj.hasIn(['data', 'dist-tags', 'latest']);
        const latestVersion = hasVersion
          ? obj.getIn(['data', 'dist-tags', 'latest'])
          : false;

        let status;
        try {
          status = compareVersions(
            latestVersion,
            requiredVersion.replace(/[^0-9.]/g, '')
          );
        } catch {
          status = null;
        }

        return Map({
          name: packageName,
          payload: obj.get('data'),
          requiredVersion,
          isDependency: true,
          status,
          errored: !status ? true : false,
        });
      });

      return state.set('isFetching', false).set('response', data);
    case FETCH_PACKAGES.FAILURE.FAILURE:
      return initialState.set('errored', true);
    default:
      return state;
  }
}
