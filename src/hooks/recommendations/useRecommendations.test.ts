import { renderHook, act } from '@testing-library/react';
import { useRecommendations } from './useRecommendations';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RECOMMENDATION_URL } from '../../configs';

const mock = new MockAdapter(axios);

describe('useRecommendations', () => {
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
		const { result } = renderHook(() => useRecommendations());
		const Setup = require('../../setup');
		const API_KEY = 'API_KEY';
		const SECRET = 'SECRET';
		const response = {
			response: {},
			statusCode: 200,
		};
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });
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
		const { result } = renderHook(() => useRecommendations());
		const Setup = require('../../setup');
		const API_KEY = 'API_KEY';
		const SECRET = 'SECRET';
		const response = {
			response: {
				errorResponse: 'hi',
				errorCode: 123,
			},
			statusCode: 300,
		};
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });
		mock.onPost(RECOMMENDATION_URL).reply(200, response);
		await act(async () => {
			await result.current.getRecs({ recommendation: {} });
		});

		expect(result.current.data).toEqual(null);
		expect(result.current.isInit).toEqual(false);
		expect(result.current.isLoading).toEqual(false);
		expect(result.current.isSuccess).toEqual(false);
		expect(result.current.isFailure).toEqual(true);
		expect(result.current.error).toEqual(response);
	});
});
