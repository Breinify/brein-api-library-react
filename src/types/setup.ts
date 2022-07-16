import { requiredSetup } from 'src/setup';

export interface IConfig {
	apiKey?: string;
	secret?: string;
}

type RequiredProperties = keyof typeof requiredSetup;
type RequiredPickConfig = Required<Pick<IConfig, RequiredProperties>>;
export type SetupProps = IConfig & RequiredPickConfig;
