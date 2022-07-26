import { renderHook, act } from '@testing-library/react';
import { useLoader } from './useLoader';
import { STATUS } from '../../types';

describe('useLoader', () => {
	test('Init', () => {
		const defaultStatus = STATUS.REQUESTING;
		const defaultDataState = {};
		const { result } = renderHook(() => useLoader(defaultStatus, defaultDataState));

		expect(result.current.data).toEqual(defaultDataState);
		expect(result.current.loadingStatus.status).toEqual(defaultStatus);
	});

	test('setLoading', () => {
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

	test('setLoading with isRefetch', () => {
		const { result } = renderHook(() => useLoader());
		act(() => {
			result.current.setLoading(true);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.REFETCH);
	});

	test('setLoading with shouldClearData: true', () => {
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

	test('setSuccess with data', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.SUCCESS);
		expect(result.current.data).toEqual(response);
	});

	test('setSuccess with no data', () => {
		const { result } = renderHook(() => useLoader());
		act(() => {
			result.current.setSuccess();
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.SUCCESS);
		expect(result.current.data).toEqual(null);
	});

	test('setError with reason', () => {
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

	test('setError without reason', () => {
		const { result } = renderHook(() => useLoader());
		const response = 'response';
		act(() => {
			result.current.setSuccess(response);
		});
		act(() => {
			result.current.setError();
		});

		expect(result.current.loadingStatus.status).toEqual(STATUS.FAILURE);
		expect(result.current.data).toEqual(response);
	});

	test('setError with shouldClearData: true', () => {
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
		expect(result.current.data).toEqual(null);
	});
});
