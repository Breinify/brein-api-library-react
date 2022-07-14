import React, { useEffect, useState } from 'react';
// import { BreinifySetup, getRecommendations } from 'brein-api-library-react';

const apiKey = process.env.API_KEY;
const secret = process.env.SECRET;

// BreinifySetup({ apiKey });

export function TestContainer() {
	const [value, setValue] = useState<any>({});

	function getCall() {
		console.log('value: ', value);
		// getRecommendations()
		// 	.then((response: any) => {
		// 		console.log('response: ', response);
		// 		setValue(response);
		// 	})
		// 	.catch((error: any) => {
		// 		console.log('error: ', error);
		// 	});
	}

	useEffect(() => {
		getCall();
	}, []);

	return <div>{JSON.stringify(value, null, 2)}</div>;
}
