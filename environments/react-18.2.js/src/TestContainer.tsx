import React, { useEffect, useState } from 'react';
import { BreinifySetup, getRecommendations, useRecommendations } from 'brein-api-library-react';

const apiKey = process.env.REACT_APP_API_KEY || '';
const secret = process.env.REACT_APP_SECRET;

BreinifySetup({ apiKey, secret });

export function TestContainer() {
	const { getRecs, data, isLoading, isSuccess, isFailure, error } = useRecommendations({});

	function onButton() {
		getRecs({ recommendation: {} });
	}

	useEffect(() => {
		getRecs({ recommendation: { numRecommendations: 10 } });
	}, []);

	console.log('data, isLoading, isSuccess, isFailure, error: ', { data, isLoading, isSuccess, isFailure, error });

	return (
		<div>
			{isLoading && <div>LOADING</div>}
			{isSuccess && <>{JSON.stringify(data, null, 2)}</>}
			{isFailure && <>{error}</>}
			<button onClick={onButton}>Click Here</button>
		</div>
	);
}
