import gql from 'graphql-tag';
const StationFragments = {};

StationFragments.fragments = {
	station_meta_data: gql`
		fragment MetaData on Station {
			name
			primaryEvaId
			picture {
				url
			}
		}
	`,
	timetable: gql`
		fragment Timetable on Station {
			timetable {
				nextArrivals {
					type
					trainNumber
					platform
					time
					stops
				}
				nextDepatures {
					type
					trainNumber
					platform
					time
					stops
				}
			}
		}
	`,
	location: gql`
		fragment Location on Station {
			location {
				latitude
				longitude
			}
		}
	`,
};

export default StationFragments;
