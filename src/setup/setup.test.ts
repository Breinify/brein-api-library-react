describe('Setup functions', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('valid apiKey, valid secret', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const SECRET = 'SECRET';
		Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET });

		expect(Setup.BreinifyGlobalConfigs).toEqual({ apiKey: API_KEY, secret: SECRET });
	});

	it('valid apiKey, no secret', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		Setup.BreinifySetup({ apiKey: API_KEY });

		expect(Setup.BreinifyGlobalConfigs).toEqual({ apiKey: API_KEY, secret: undefined });
	});

	it('no apiKey, valid secret', () => {
		const Setup = require('./setup');
		const SECRET = 'SECRET';

		expect(() => Setup.BreinifySetup({ secret: SECRET } as any)).toThrow();
	});

	it('no apiKey, no secret', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup({} as any)).toThrow();
	});

	it('undefined', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup(undefined as any)).toThrow();
	});

	it('invalid apiKey: array', () => {
		const Setup = require('./setup');
		const API_KEY = ['hello'];

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY } as any)).toThrow();
	});

	it('invalid apiKey: number', () => {
		const Setup = require('./setup');
		const API_KEY = 123;

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY } as any)).toThrow();
	});

	it('invalid apiKey: object', () => {
		const Setup = require('./setup');
		const API_KEY = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY } as any)).toThrow();
	});

	it('valid apiKey, invalid secret: array', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const SECRET = ['hello'];

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET } as any)).toThrow();
	});

	it('valid apiKey, invalid secret: number', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const SECRET = 123;

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET } as any)).toThrow();
	});

	it('valid apiKey, invalid secret: object', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const SECRET = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: SECRET } as any)).toThrow();
	});

	it('incorrect param: string', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup('hello' as any)).toThrow();
	});

	it('incorrect param: number', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup(123 as any)).toThrow();
	});

	it('incorrect param: array', () => {
		const Setup = require('./setup');

		expect(() => Setup.BreinifySetup([] as any)).toThrow();
	});
});
