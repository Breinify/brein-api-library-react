import { getRecommendations } from '../../api';
import { RecommendationQuery } from '../../types';
import { useLoader } from '../../hooks/helpers';
import { STATUS } from '../../types/common';
import { useCallback } from 'react';

export const useRecommendations = <T = any>(defaultDataState: any = null) => {
	const { loadingStatus, data, setLoading, setSuccess, setError } = useLoader(undefined, defaultDataState);
	const getRecs = useCallback(
		({ user, unixTimestamp, signature, recommendation, recommendations }: RecommendationQuery) => {
			setLoading();
			getRecommendations({ user, unixTimestamp, signature, recommendation, recommendations })
				.then((response) => {
					setSuccess(response);
				})
				.catch((error) => {
					setError(error);
				});
		},
		[getRecommendations, setLoading, setSuccess, setError]
	);
	return {
		getRecs,
		data,
		isLoading: loadingStatus.status === STATUS.REQUESTING,
		isSuccess: loadingStatus.status === STATUS.SUCCESS,
		isFailure: loadingStatus.status === STATUS.FAILURE,
		error: loadingStatus.reason,
	};
};
