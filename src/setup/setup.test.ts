import * as Setup from './setup';
describe('setup functions', () => {
	it('should set the global variable when passed', () => {
		const APIKEY = 'HELLO';
		Setup.BreinifySetup({ apiKey: APIKEY });

		expect(Setup.BreinifyGlobalConfigs.apiKey).toEqual(APIKEY);
	});
});
