import { Query } from 'react-apollo';

import { StationDefs, StationDefsVariables } from './__generated__/StationDefs';

export default class StationsQuery extends Query<
	StationDefs,
	StationDefsVariables
> {}
