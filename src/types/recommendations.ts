export interface User {
	email?: string;
	phone?: string;
	sessionId?: string;
	userId?: string;
	identifiers?: {
		browserId: string;
	};
	additional?: UserAdditionalData;
}

export interface UserAdditionalData {
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

export interface Recommendation {
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

export interface DataTags {
	atStore?: string;
	deviceType?: 'Bot' | 'Personal computer' | 'Smartphone' | Omit<string, 'Bot' | 'Personal computer' | 'Smartphone'>;
}

export interface CuratedLists {
	specifiedLists: Array<string>;
}

export interface RecommendationAdditionalParameters {
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

interface BaseRecommendationQuery {
	unixTimestamp?: number;
	user?: User;
	signature?: string | null;
}

interface SingleRecommendationQuery extends BaseRecommendationQuery {
	recommendation: Recommendation;
}

interface MultipleRecommendationQuery extends BaseRecommendationQuery {
	recommendations: Array<Recommendation>;
}

export type RecommendationQuery = SingleRecommendationQuery | MultipleRecommendationQuery;
