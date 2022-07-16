interface GenericProperties {
	[key: string]: any;
}

export interface User extends GenericProperties {
	email?: string;
	phone?: string;
	sessionId?: string;
	userId?: string;
	identifiers?: {
		browserId: string;
	};
	additional?: UserAdditionalData;
}

export interface UserAdditionalData extends GenericProperties {
	identifiers?: {
		browserId?: string;
		assignedGroup?: string;
		originalSessionId?: string;
	};
	localDateTime?: string;
	location?: {
		storeId?: number;
	};
	timezone?: string;
	userAgent?: string;
	url?: string;
}

export interface Recommendation extends GenericProperties {
	namedRecommendations?: Array<string>;
	numRecommendations?: number;
	queryPostProcessors?: Array<string>;
	recommendationAdditionalParameters?: RecommendationAdditionalParameters;
	recommendationAtTime?: number;
	recommendationCategories?: Array<string>;
	recommendationCategoriesBlacklist?: Array<string>;
	recommendationDisableFilters?: boolean;
	recommendationForItems?: Array<string>;
	recommendationMinQuantity?: number;
	recommendationQueryName?: string;
	recommendationRemoveDuplicates?: boolean;
	recommendationSubBlockers?: Array<string>;
	recommendationSubInhibitors?: Array<string>;
	recommendationSubRecommenders?: Array<string>;
}

export interface DataTags extends GenericProperties {
	atStore?: string;
	deviceType?: 'Bot' | 'Personal computer' | 'Smartphone' | Omit<string, 'Bot' | 'Personal computer' | 'Smartphone'>;
}

export interface CuratedLists extends GenericProperties {
	specifiedLists: Array<string>;
}

export interface RecommendationAdditionalParameters extends GenericProperties {
	customSorterTypes?: Array<string>;
	dataTags?: DataTags;
	dataTagsToConsider?: Array<keyof DataTags | Omit<string, keyof DataTags>>;
	ignoreRecommendations?: boolean;
	manual?: CuratedLists;
	numRecommendationsInternal?: number;
	postProcessors?: Array<string>;
	selectedModels?: Array<string>;
	temporalTypes?: Array<string>;
}

interface BaseRecommendationQuery extends GenericProperties {
	unixTimestamp?: number;
	user?: User;
	signature?: string | null;
}

interface SingleRecommendationQuery extends BaseRecommendationQuery {
	recommendation: Recommendation;
	recommendations?: never;
}

interface MultipleRecommendationQuery extends BaseRecommendationQuery {
	recommendation?: never;
	recommendations: Array<Recommendation>;
}

export type RecommendationQuery = SingleRecommendationQuery | MultipleRecommendationQuery;
