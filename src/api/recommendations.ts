import axios from 'axios';
import { API, RECOMMENDATION } from '../configs';
import { BreinifyGlobalConfigs } from '../setup';
import { isSetupComplete } from '../utils';

const URL = `${API}/${RECOMMENDATION}`;
const INIT_ERROR = 'Please complete library initialization: BreinifySetup';

export function getRecommendations() {
	if (!isSetupComplete()) throw INIT_ERROR;

	const data = {
		apiKey: BreinifyGlobalConfigs.apiKey,
		secret: BreinifyGlobalConfigs.secret,
		unixTimestamp: 1657152522,
		recommendation: {},
	};
	console.log('URL: ', URL);
	console.log('data: ', data);
	return axios
		.post(URL, data)
		.then((response) => {
			console.log('response : ', response);
		})
		.catch((error) => {
			console.log('error : ', error);
		});
}
