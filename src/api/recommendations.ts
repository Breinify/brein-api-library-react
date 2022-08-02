import axios from 'axios';

// CONFIGS
import { RECOMMENDATION_URL } from '../configs';

// SETUP
import { BreinifyGlobalConfigs, isSetupComplete } from '../setup';

// TYPES
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
		const { data } = response;
		if (data?.statusCode === 200) return data;
		throw data;
	});
}
