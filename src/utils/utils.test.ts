import { isString } from './utils';

describe('isSetupComplete', () => {});

describe('isString', () => {
	it('boolean: true', () => {
		const value = isString('hello');
		expect(value).toEqual(true);
	});

	it('boolean: false', () => {
		const NUMBER = isString(123);
		const ARRAY = isString(['hello']);
		const OBJECT = isString({ hello: 1 });

		expect(NUMBER).toEqual(false);
		expect(ARRAY).toEqual(false);
		expect(OBJECT).toEqual(false);
	});
});
