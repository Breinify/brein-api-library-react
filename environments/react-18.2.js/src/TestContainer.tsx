import React, { useEffect, useState } from 'react';
import { BreinifySetup, getRecommendations, useRecommendations } from 'brein-api-library-react';

const apiKey = process.env.REACT_APP_API_KEY || '';
const secret = process.env.REACT_APP_SECRET;

BreinifySetup({ apiKey, secret });

export function TestContainer() {
	const { getRecs, data, isLoading, isSuccess, isFailure, error } = useRecommendations({});

	useEffect(() => {
		setTimeout(() => {
			getRecs({ recommendation: { numRecommendations: 10 } });
		}, 1000);
	}, []);

	console.log('data, isLoading, isSuccess, isFailure, error: ', { data, isLoading, isSuccess, isFailure, error });

	return (
		<div>
			{isLoading && <div>LOADING</div>}
			{isSuccess && <>{JSON.stringify(data, null, 2)}</>}
			{isFailure && <>{error}</>}
		</div>
	);
}
