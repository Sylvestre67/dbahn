import { Query } from 'react-apollo';

import { Station, StationVariables } from '../context/__generated__/Station';

export default class StationQuery extends Query<Station, StationVariables> {}
