describe('Setup functions', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	test('should succeed when a valid apiKey and valid secret is passed', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const SECRET = 'SECRET';
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });

		expect(Setup.BreinifyGlobalConfigs).toEqual({ apiKey: API_KEY, secret: SECRET });
	});

	test('should succeed when a valid apiKey and no secret is passed', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		Setup.BreinifySetup({ apiKey: API_KEY });

		expect(Setup.BreinifyGlobalConfigs).toEqual({ apiKey: API_KEY, secret: undefined });
	});

	test('should throw when no apiKey and a valid secret is passed', () => {
		const Setup = require('./setup');
		const SECRET = 'SECRET';

		expect(() => Setup.BreinifySetup({ secret: SECRET } as any)).toThrow();
	});

	test('should throw when an empty object is passed', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup({} as any)).toThrow();
	});

	test('should throw when nothing is passed', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup(undefined as any)).toThrow();
	});

	test('should throw when an invalid apiKey is passed', () => {
		const Setup = require('./setup');
		const ARRAY = ['hello'];
		const NUMBER = 123;
		const OBJECT = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: ARRAY } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: NUMBER } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: OBJECT } as any)).toThrow();
	});

	test('should throw when a valid apiKey and invalid secret is passed', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const ARRAY = ['hello'];
		const NUMBER = 123;
		const OBJECT = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: ARRAY } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: NUMBER } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: OBJECT } as any)).toThrow();
	});

	test('should throw when invalid parameters are passed', () => {
		const Setup = require('./setup');
		const STRING = 'hello';
		const ARRAY = ['hello'];
		const NUMBER = 123;

		expect(() => Setup.BreinifySetup(STRING as any)).toThrow();
		expect(() => Setup.BreinifySetup(ARRAY as any)).toThrow();
		expect(() => Setup.BreinifySetup(NUMBER as any)).toThrow();
	});
});
