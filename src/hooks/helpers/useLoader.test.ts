import { renderHook, act } from '@testing-library/react';
import { useLoader } from './useLoader';
import { STATUS } from '../../types';

describe('useLoader', () => {
	test('init state when calling useLoader', () => {
		const defaultStatus = STATUS.REQUESTING;
		const defaultDataState = {};
		const { result } = renderHook(() => useLoader(defaultStatus, defaultDataState));

		expect(result.current.data).toEqual(defaultDataState);
		expect(result.current.loadingStatus.status).toEqual(defaultStatus);
	});

	test('after calling setSuccess, setLoading should preserve data and change the loadingStatus.status to REQUESTING', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setLoading();
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.REQUESTING);
		expect(result.current.data).toEqual(response);
	});

	test('setLoading with isRefetch: true should change loadingStatus.status to REFETCH', () => {
		const { result } = renderHook(() => useLoader());
		act(() => {
			result.current.setLoading(true);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.REFETCH);
	});

	test('after calling setSuccess, setLoading with shouldClearData: true should clear data and change the loadingStatus.status to REQUESTING', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setLoading(false, true);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.REQUESTING);
		expect(result.current.data).toEqual(null);
	});

	test('passing the response into setSuccess should set data with the response', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.SUCCESS);
		expect(result.current.data).toEqual(response);
	});

	test('passing no response into setSuccess should set data to null', () => {
		const { result } = renderHook(() => useLoader());
		act(() => {
			result.current.setSuccess();
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.SUCCESS);
		expect(result.current.data).toEqual(null);
	});

	test('after setting response to setSuccess, setError with an error should change loadingStatus.status to FAILURE, set error with the error, and preserve data', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		const error = 'error';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setError(error);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.FAILURE);
		expect(result.current.loadingStatus.reason).toEqual(error);
		expect(result.current.data).toEqual(response);
	});

	test("after setting response to setSuccess, setError with NO error should change loadingStatus.status to FAILURE, set error to '', and preserve data", () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setError();
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.FAILURE);
		expect(result.current.loadingStatus.reason).toEqual('');
		expect(result.current.data).toEqual(response);
	});

	test('after setting response to setSuccess, setError with an error and shouldClearData: true should change loadingStatus.status to FAILURE, set error with the error, and clear data', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'hello';
		const error = 'error';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setError(error, true);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.FAILURE);
		expect(result.current.loadingStatus.reason).toEqual(error);
		expect(result.current.data).toEqual(null);
	});
});
