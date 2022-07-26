import { useCallback } from 'react';

// HOOKS
import { useLoader } from '../helpers';

// TYPES
import { RecommendationQuery, STATUS } from '../../types';

// COMPONENTS
import { getRecommendations } from '../../api';

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
		isInit: loadingStatus.status === STATUS.INIT,
		isLoading: loadingStatus.status === STATUS.REQUESTING,
		isSuccess: loadingStatus.status === STATUS.SUCCESS,
		isFailure: loadingStatus.status === STATUS.FAILURE,
		error: loadingStatus.reason,
	};
};
