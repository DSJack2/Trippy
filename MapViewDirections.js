import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import isEqual from 'lodash.isequal';

class MapViewDirections extends Component {

	constructor(props) {
		super(props);

		this.state = {
			coordinates: null,
			distance: null,
			duration: null,
			newWaypoints: []
		};
	}

	componentDidMount() {
		this._mounted = true;
		this.fetchAndRenderRoute(this.props);
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.origin, this.props.origin) || !isEqual(nextProps.destination, this.props.destination) || !isEqual(nextProps.waypoints, this.props.waypoints)) {
			if (nextProps.resetOnChange === false) {
				this.fetchAndRenderRoute(nextProps);
			} else {
				this.resetState(() => {
					this.fetchAndRenderRoute(nextProps);
				});
			}
		}
	}

	resetState = (cb = null) => {
		this._mounted && this.setState({
			coordinates: null,
			distance: null,
			duration: null,
		}, cb);
	}

	decode(t, e) {
		for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
			a = null, h = 0, i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
			do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
			o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
		}

		return d = d.map(function (t) {
			return {
				latitude: t[0],
				longitude: t[1],
			};
		});
	}

	fetchAndRenderRoute = (props) => {

		let {
			origin,
			destination,
			waypoints,
			apikey,
			onStart,
			onReady,
			onError,
			mode = 'driving',
			language = 'en',
			tripCriteria,
			directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json',
		} = props;

		if (!origin || !destination) {
			return;
		}

		if (origin.latitude == 0 || origin.longitude == 0 || destination.latitude == 0 || destination.longitude == 0) {
			return;
		}

		if (origin.latitude && origin.longitude) {
			origin = `${origin.latitude},${origin.longitude}`;
		}

		if (destination.latitude && destination.longitude) {
			destination = `${destination.latitude},${destination.longitude}`;
		}

		if (!waypoints || !waypoints.length) {
			waypoints = '';
		} else {
			waypoints = waypoints
				.map(waypoint => (waypoint.latitude && waypoint.longitude) ? `${waypoint.latitude},${waypoint.longitude}` : waypoint)
				.join('|');
		}


		onStart && onStart({
			origin,
			destination,
			waypoints: waypoints ? waypoints.split('|') : [],
		});

		this.fetchRoute(directionsServiceBaseUrl, origin, waypoints, destination, apikey, mode, language)
			.then(result => {
				let distanceTotal = 0;
				let durationTotal = 0;
				let criteriaCounter = 0;

				var currentTime = new Date();


				result.json.routes[0].legs[0].steps.map((step) => {
					if (criteriaCounter < tripCriteria.length) {
						durationTotal += Math.floor(step.duration.value / 60);
						let criteriaHours = tripCriteria[criteriaCounter].time.getHours(); //time hours
						let criteriaMinutes = tripCriteria[criteriaCounter].time.getMinutes(); // time minutes
						let estimatedTime = this.handleEstimatedStepTime(currentTime, durationTotal);
						// console.log('EST: ' + estimatedTime);
						// console.log('MIN: ' + this.calculateMinTime(criteriaHours, criteriaMinutes));
						// console.log('MAX: ' + this.calculateMaxTime(criteriaHours, criteriaMinutes));

						if (estimatedTime >= this.calculateMinTime(criteriaHours, criteriaMinutes) && estimatedTime <= this.calculateMaxTime(criteriaHours, criteriaMinutes)) {
							this.fetchWaypoint(apikey, tripCriteria[criteriaCounter].category + ' ' + tripCriteria[criteriaCounter].criteriaName, step.start_location)
								.then(waypointResult => {
									this.setState(prevState => ({ newWaypoints: [...prevState.newWaypoints, waypointResult.json.results[0]] }));
									waypoints = this.state.newWaypoints.map(waypoint => `place_id:${waypoint.place_id}`).join('|');
								});
							if (criteriaCounter <= tripCriteria.length - 1) {
								criteriaCounter++;
							}

						}
					}

				});


			})
			.then(result => this.fetchRoute(directionsServiceBaseUrl, origin, 'place_id:ChIJqXbP29wU9YgRMJzOn64yYT0|place_id:ChIJuW5FL94U9YgRzto14r1pzxo', destination, apikey, mode, language)
				.then(result2 => {
					console.log('test: ' + waypoints);
					if (!this._mounted) return;
					this.setState(result2);
					// console.log(result2);
					onReady && onReady(result2);
					return result2;
				})
				.catch(errorMessage => {
					this.resetState();
					console.warn(`MapViewDirections Error: ${errorMessage}`); // eslint-disable-line no-console
					onError && onError(errorMessage);
				}));

	}

	fetchWaypoint(apikey, searchInput, projectedLocation) {
		let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
		url += `?input=${searchInput}&inputtype=textquery&location=${projectedLocation.lat},${projectedLocation.lng}&fields=name,types&key=${apikey}&radius=2000`;

		return fetch(encodeURI(url))
			.then(response => response.json())
			.then(json => {
				if (json.status !== 'OK') {
					const errorMessage = json.error_message || 'Unkown error';
					return Promise.reject(errorMessage);
				}

				if (json.results.length) {
					return Promise.resolve({ json });
				} else {
					return Promise.reject();
				}

			})
	}

	fetchRoute(directionsServiceBaseUrl, origin, waypoints, destination, apikey, mode, language) {

		// Define the URL to call. Only add default parameters to the URL if it's a string.
		let url = directionsServiceBaseUrl;
		if (typeof (directionsServiceBaseUrl) === 'string') {
			url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apikey}&mode=${mode}&language=${language}`;
		}

		return fetch(url)
			.then(response => response.json())
			.then(json => {

				if (json.status !== 'OK') {
					const errorMessage = json.error_message || 'Unknown error';
					return Promise.reject(errorMessage);
				}

				if (json.routes.length) {

					const route = json.routes[0];

					return Promise.resolve({
						json,
						coordinates: this.decode(route.overview_polyline.points)
					});

				} else {
					return Promise.reject();
				}
			});
	}

	calculateMaxTime(criteriaHours, criteriaMinutes) {
		let criteriaMax = new Date();

		if (criteriaMinutes % 60 > 30) {
			criteriaMax.setHours(criteriaHours + 1);
			criteriaMax.setMinutes(60 - criteriaMinutes);
		} else {
			criteriaMax.setHours(criteriaHours);
			criteriaMax.setMinutes(criteriaMinutes + 30);
		}

		return criteriaMax;
	}

	calculateMinTime(criteriaHours, criteriaMinutes) {
		let criteriaMin = new Date();

		if (criteriaMinutes % 60 < 30) {
			criteriaMin.setHours(criteriaHours - 1);
			criteriaMin.setMinutes(60 - criteriaMinutes);
		} else {
			criteriaMin.setHours(criteriaHours);
			criteriaMin.setMinutes(criteriaMinutes - 30);
		}

		return criteriaMin;
	}

	handleEstimatedStepTime(currentTime, tripDuration) {
		var tripTime = new Date();
		let hours = Math.floor(tripDuration / 60);
		let minutes = tripDuration % 60;

		tripTime.setHours(currentTime.getHours() + hours);
		if (currentTime.getMinutes() + minutes > 59) {
			tripTime.setMinutes((currentTime.getMinutes() + minutes) % 60);
			tripTime.setHours(tripTime.getHours() + 1);
		} else {
			tripTime.setMinutes((currentTime.getMinutes() + minutes));
		}

		return tripTime;
	}

	renderMarkers() {
		let {
			origin,
			destination,
			waypoints,
			apikey,
			onStart,
			onReady,
			onError,
			mode = 'driving',
			language = 'en',
			tripCriteria,
			directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json',
		} = this.props;

		if (this.state.newWaypoints.length !== 0) {
			this.state.newWaypoints.map(waypoint => {
				return (
					<MapView.Marker
						coordinate={{
							latitude: waypoint.geometry.location.lat,
							longitude: waypoint.geometry.location.lng
						}}
						title={waypoint.name}
						pinColor='blue'
					/>
				)
			})
		}
	}


	render() {
		if (!this.state.coordinates) {
			return null;
		}

		const {
			origin, // eslint-disable-line no-unused-vars
			waypoints, // eslint-disable-line no-unused-vars
			destination, // eslint-disable-line no-unused-vars
			apikey, // eslint-disable-line no-unused-vars
			onReady, // eslint-disable-line no-unused-vars
			onError, // eslint-disable-line no-unused-vars
			mode, // eslint-disable-line no-unused-vars
			language, // eslint-disable-line no-unused-vars
			...props
		} = this.props;

		return (
			<View>
				<MapView.Polyline coordinates={this.state.coordinates} {...props} />
				{this.renderMarkers()}
			</View>
		);
	}

}

MapViewDirections.propTypes = {
	origin: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			latitude: PropTypes.number.isRequired,
			longitude: PropTypes.number.isRequired,
		}),
	]),
	waypoints: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({
				latitude: PropTypes.number.isRequired,
				longitude: PropTypes.number.isRequired,
			}),
		]),
	),
	destination: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			latitude: PropTypes.number.isRequired,
			longitude: PropTypes.number.isRequired,
		}),
	]),
	apikey: PropTypes.string.isRequired,
	onStart: PropTypes.func,
	onReady: PropTypes.func,
	onError: PropTypes.func,
	mode: PropTypes.oneOf(['driving', 'bicycling', 'transit', 'walking']),
	language: PropTypes.string,
	resetOnChange: PropTypes.bool,
	directionsServiceBaseUrl: PropTypes.string,
};

export default MapViewDirections;
