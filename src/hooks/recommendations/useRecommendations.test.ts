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

	test('getRecs', async () => {
		const { result, rerender } = renderHook(() => useRecommendations());
		const Setup = require('../../setup');
		const API_KEY = 'API_KEY';
		const SECRET = 'SECRET';
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });
		mock.onPost(RECOMMENDATION_URL).reply(200, {
			data: { user: 1 },
			status: 200,
		});

		// await act(async () => {
		// 	await result.current.getRecs({ recommendation: {} });
		// });
		await act(async () => {
			await result.current.getRecs({ recommendation: {} });
			console.log('inside', result.current);
		});

		console.log('huh', result.current);

		await rerender();
		console.log('first', result.current);

		// expect(result.current.data).toEqual({ data: {} });

		await rerender();

		console.log('after: ', result.current);

		expect(result.current.isSuccess).toEqual(true);
	});
});
