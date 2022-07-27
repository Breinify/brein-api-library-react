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

	test('getRecs success', async () => {
		const mock = mockAxios();
		const response = {
			response: {},
			statusCode: 200,
		};

		const { result } = renderHook(() => useRecommendations());
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

	test('getRecs failure', async () => {
		const mock = mockAxios({ delayResponse: TIMEOUT });
		jest.useFakeTimers();
		const { result } = renderHook(() => useRecommendations());
		const response = {
			response: {
				errorResponse: 'hi',
				errorCode: 123,
			},
			statusCode: 300,
		};
		await act(async () => {
			mock.onPost(RECOMMENDATION_URL).reply(200, response);
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
