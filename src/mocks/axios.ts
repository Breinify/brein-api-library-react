import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Copied from 'axios-mock-adapter' types definition since the type definition is not exported
interface MockAdapterOptions {
	delayResponse?: number;
	onNoMatch?: 'passthrough' | 'throwException';
}

export function mockAxios(options?: MockAdapterOptions): MockAdapter {
	return new MockAdapter(axios, options);
}
