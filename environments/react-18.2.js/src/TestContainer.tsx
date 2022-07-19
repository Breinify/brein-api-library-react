import React, { useEffect, useState } from 'react';
import { BreinifySetup, getRecommendations, useRecommendations } from 'brein-api-library-react';

const apiKey = process.env.REACT_APP_API_KEY || '';
const secret = process.env.REACT_APP_SECRET;

BreinifySetup({ apiKey, secret });

export function TestContainer() {
	const [value, setValue] = useState<any>({});
	const { getRecs, data, isLoading, isSuccess, isFailure, error } = useRecommendations();

	useEffect(() => {
		getRecs({ recommendation: { numRecommendations: 10 } });
	}, []);

	console.log('data, isLoading, isSuccess, isFailure, error: ', { data, isLoading, isSuccess, isFailure, error });

	return <div>{JSON.stringify(value, null, 2)}</div>;
}
