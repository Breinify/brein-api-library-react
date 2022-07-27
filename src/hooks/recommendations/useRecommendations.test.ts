// testing utilities
import { renderHook, act } from '@testing-library/react';

// mocks
import { mockAxios } from '../../mocks/axios';

// constants
import { RECOMMENDATION_URL } from '../../configs';

import { useRecommendations } from './useRecommendations';

const TIMEOUT = 100;

describe('useRecommendations', () => {
	const API_KEY = 'API_KEY';
	const SECRET = 'SECRET';

	beforeEach(() => {
		const Setup = require('../../setup');
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });
	});

	test('Init', () => {
		const defaultData = {};
		const { result } = renderHook(({ defaultDataState }) => useRecommendations(defaultDataState), {
			initialProps: { defaultDataState: defaultData },
		});

		expect(result.current.data).toEqual(defaultData);
		expect(result.current.isInit).toEqual(true);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.isSuccess).toEqual(false);
		expect(result.current.isFailure).toEqual(false);
		expect(result.current.error).toEqual('');
	});

	test('getRecs should succeed if statusCode: 200 is returned', async () => {
		const mock = mockAxios();
		const { result } = renderHook(() => useRecommendations());
		const response = {
			response: {},
			statusCode: 200,
		};
		mock.onPost(RECOMMENDATION_URL).reply(200, response);

		await act(async () => {
			result.current.getRecs({ recommendation: {} });
		});

		expect(result.current.data).toEqual(response);
		expect(result.current.isInit).toEqual(false);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.isSuccess).toEqual(true);
		expect(result.current.isFailure).toEqual(false);
		expect(result.current.error).toEqual('');
	});

	const failedCodes = [100, 300, 400, 500, 600, 700, 800, 900];
	test.each(failedCodes)('getRecs should fail if statusCode === %s', async (statusCode) => {
		const { result } = renderHook(() => useRecommendations());
		const mock = mockAxios({ delayResponse: TIMEOUT });
		const response = {
			response: {
				errorResponse: 'hi',
				errorCode: 123,
			},
			statusCode,
		};
		mock.onPost(RECOMMENDATION_URL).reply(200, response);
		jest.useFakeTimers();

		await act(async () => {
			result.current.getRecs({ recommendation: {} });
		});

		// test loading states
		expect(result.current.isLoading).toEqual(true);

		await act(() => {
			jest.runAllTimers(); // trigger setTimeout
		});

		expect(result.current.data).toEqual(null);
		expect(result.current.isInit).toEqual(false);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.isSuccess).toEqual(false);
		expect(result.current.isFailure).toEqual(true);
		expect(result.current.error).toEqual(response);
	});
});
