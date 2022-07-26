import { renderHook, act } from '@testing-library/react';
import { useRecommendations } from './useRecommendations';
import axios from 'axios';

jest.mock('axios');

describe('useRecommendations', () => {
	test('Init', async () => {
		const defaultDataState = {};
		const { result } = renderHook(() => useRecommendations(defaultDataState));

		expect(result.current.data).toEqual(defaultDataState);
		expect(result.current.isInit).toEqual(true);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.isSuccess).toEqual(false);
		expect(result.current.isFailure).toEqual(false);
		expect(result.current.error).toEqual('');
	});
});
