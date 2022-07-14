interface IConfig {
	apiKey?: string;
	secret?: string;
}

type RequiredProperties = keyof typeof requiredSetup;
type RequiredPickConfig = Required<Pick<IConfig, RequiredProperties>>;
type SetupProps = IConfig & RequiredPickConfig;

// Required keys needed to initialize BreinifyGlobalConfigs
export const requiredSetup = {
	apiKey: 'apiKey',
};

export const BreinifyGlobalConfigs = {} as IConfig;

// Users call this on their app (in the highest level)
export function BreinifySetup({ apiKey, secret }: SetupProps): void {
	BreinifyGlobalConfigs.apiKey = apiKey;
	BreinifyGlobalConfigs.secret = secret;
}
