// PACKAGE
import axios from 'axios';

// CONFIGS
import { BreinifyGlobalConfigs } from '../setup';
import { RECOMMENDATION_URL } from '../configs';

// UTILS
import { isSetupComplete } from '../utils';

const INIT_ERROR = 'Please complete library initialization: BreinifySetup';

export function getRecommendations() {
	if (!isSetupComplete()) throw INIT_ERROR;

	const data = {
		apiKey: BreinifyGlobalConfigs.apiKey,
		secret: BreinifyGlobalConfigs.secret,
		unixTimestamp: 1657152522,
		recommendation: {},
	};
	return axios.post(RECOMMENDATION_URL, data).then((response) => {
		const { data, status } = response;
		if (status === 200) return data;
		throw data;
	});
}
