import React from 'react';
import { STATUS } from '../../types/common';

export const useLoader = (defaultStatus: STATUS = STATUS.REQUESTING, defaultDataState: any = null) => {
	const [loadingStatus, setLoadingStatus] = React.useState({ status: defaultStatus, reason: '' });
	const [data, setData] = React.useState(defaultDataState);

	const setLoading = React.useCallback(
		(isRefetch = false, shouldClearData = false) => {
			setLoadingStatus({ status: isRefetch ? STATUS.REFETCH : STATUS.REQUESTING, reason: '' });
			if (shouldClearData) setData(null);
		},
		[setLoadingStatus]
	);
	const setSuccess = React.useCallback(
		(data: any) => {
			setData(data);
			setLoadingStatus({ status: STATUS.SUCCESS, reason: '' });
		},
		[setLoadingStatus, setData]
	);
	const setError = React.useCallback(
		(reason: any, shouldClearData = false) => {
			setLoadingStatus({ status: STATUS.FAILURE, reason });
			if (shouldClearData) setData(null);
		},
		[setLoadingStatus, setData]
	);

	return { loadingStatus, data, setLoading, setSuccess, setError };
};
