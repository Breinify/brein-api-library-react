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

	it('invalid apiKey', () => {
		const Setup = require('./setup');
		const ARRAY = ['hello'];
		const NUMBER = 123;
		const OBJECT = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: ARRAY } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: NUMBER } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: OBJECT } as any)).toThrow();
	});

	it('valid apiKey, invalid secret', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		const ARRAY = ['hello'];
		const NUMBER = 123;
		const OBJECT = { hello: 1 };

		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: ARRAY } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: NUMBER } as any)).toThrow();
		expect(() => Setup.BreinifySetup({ apiKey: API_KEY, secret: OBJECT } as any)).toThrow();
	});

	it('incorrect param', () => {
		const Setup = require('./setup');
		const STRING = 'hello';
		const ARRAY = ['hello'];
		const NUMBER = 123;

		expect(() => Setup.BreinifySetup(STRING as any)).toThrow();
		expect(() => Setup.BreinifySetup(ARRAY as any)).toThrow();
		expect(() => Setup.BreinifySetup(NUMBER as any)).toThrow();
	});

	it('isSetupComplete: true', () => {
		const Setup = require('./setup');
		const API_KEY = 'API_KEY';
		Setup.BreinifySetup({ apiKey: API_KEY });

		expect(Setup.isSetupComplete()).toEqual(true);
	});

	it('isSetupComplete: false', () => {
		const Setup = require('./setup');

		expect(Setup.isSetupComplete()).toEqual(false);
	});
});
