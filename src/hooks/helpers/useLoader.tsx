import { useState, useCallback } from 'react';

// TYPES
import { LoadingState, STATUS } from '../../types';

export const useLoader = (defaultStatus: STATUS = STATUS.REQUESTING, defaultDataState: any = null) => {
	const [loadingStatus, setLoadingStatus] = useState<LoadingState>({ status: defaultStatus, reason: '' });
	const [data, setData] = useState(defaultDataState);

	const setLoading = useCallback(
		(isRefetch = false, shouldClearData = false) => {
			setLoadingStatus({ status: isRefetch ? STATUS.REFETCH : STATUS.REQUESTING, reason: '' });
			if (shouldClearData) setData(defaultDataState);
		},
		[setLoadingStatus]
	);
	const setSuccess = useCallback(
		(data: any = defaultDataState) => {
			setData(data);
			setLoadingStatus({ status: STATUS.SUCCESS, reason: '' });
		},
		[setLoadingStatus, setData]
	);
	const setError = useCallback(
		(reason: any = '', shouldClearData = false) => {
			setLoadingStatus({ status: STATUS.FAILURE, reason });
			if (shouldClearData) setData(defaultDataState);
		},
		[setLoadingStatus, setData]
	);

	return { loadingStatus, data, setLoading, setSuccess, setError };
};
