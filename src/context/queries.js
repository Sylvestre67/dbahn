import gql from 'graphql-tag';
import StationFragments from './fragments';

export const SEARCH_STATIONS = gql`
	query StationDefs($search: String!) {
		search(searchTerm: $search) {
			stations {
				...MetaData
			}
		}
	}
	${StationFragments.fragments.station_meta_data}
`;

export const GET_STATION = gql`
	query Station($evaId: Int!) {
		stationWithEvaId(evaId: $evaId) {
			...MetaData
			...Timetable
			...Location
		}
	}
	${StationFragments.fragments.timetable}
	${StationFragments.fragments.location}
	${StationFragments.fragments.station_meta_data}
`;
