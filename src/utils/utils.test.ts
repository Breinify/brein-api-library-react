import { isString } from './utils';

describe('isSetupComplete', () => {});

describe('isString', () => {
	it('should return true when passed a string', () => {
		const value = isString('hello');
		expect(value).toEqual(true);
	});

	it('should return false when not passed a string ', () => {
		const NUMBER = isString(123);
		const ARRAY = isString(['hello']);
		const OBJECT = isString({ hello: 1 });

		expect(NUMBER).toEqual(false);
		expect(ARRAY).toEqual(false);
		expect(OBJECT).toEqual(false);
	});
});
