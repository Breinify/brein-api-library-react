// PACKAGE
import axios from 'axios';

// CONFIGS
import { BreinifyGlobalConfigs } from '../setup';
import { RECOMMENDATION_URL } from '../configs';

// UTILS
import { isSetupComplete } from '../utils';
import { RecommendationQuery } from '../types';

const INIT_ERROR_MESSAGE = 'Please complete library initialization: BreinifySetup';

export function getRecommendations({
	user,
	unixTimestamp,
	signature,
	recommendation,
	recommendations,
}: RecommendationQuery) {
	if (!isSetupComplete()) throw INIT_ERROR_MESSAGE;

	const data = {
		user,
		unixTimestamp,
		signature,
		apiKey: BreinifyGlobalConfigs.apiKey,
		secret: BreinifyGlobalConfigs.secret,
		recommendation,
		recommendations,
	};
	return axios.post(RECOMMENDATION_URL, data).then((response) => {
		const { data, status } = response;
		if (status === 200) return data;
		throw data;
	});
}
