import axios from 'axios';
import { API, RECOMMENDATION } from '../configs';
import { BreinifyGlobalConfigs } from 'src/setup';

const URL = `${API}/${RECOMMENDATION}`;

export function getRecommendations() {
	console.log('URL: ', URL);
	axios
		.post(URL, {
			apiKey: 'DF2E-9255-2433-4FB5-839A-A402-8640-A37E',
			unixTimestamp: 1657152522,
			recommendation: {
				recommendationCategories: ['occasion_fall'],
			},
		})
		.then((response) => {
			console.log('response : ', response);
		})
		.catch((error) => {
			console.log('error : ', error);
		});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(BreinifyGlobalConfigs);
		}, 2000);
	});
}
