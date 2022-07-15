import React, { useEffect, useState } from 'react';
import { BreinifySetup, getRecommendations } from 'brein-api-library-react';

const apiKey = process.env.REACT_APP_API_KEY || '';
const secret = process.env.REACT_APP_SECRET;

BreinifySetup({ apiKey, secret });

export function TestContainer() {
	const [value, setValue] = useState<any>({});

	function getCall() {
		getRecommendations()
			.then((response: any) => {
				console.log('response: ', response);
				setValue(response);
			})
			.catch((error: any) => {
				console.log('error: ', error);
			});
	}

	useEffect(() => {
		getCall();
	}, []);

	return <div>{JSON.stringify(value, null, 2)}</div>;
}
