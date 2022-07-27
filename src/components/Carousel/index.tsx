import React from 'react';

import type { RecommendationQuery } from '../../types';

import { useRecommendations } from '../../hooks';

import Slider from 'react-slick';
import type { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DefaultCarouselComponent = (props: any) => {
	return (
		<div>
			<pre style={{ fontSize: '10px' }}>{JSON.stringify(props, null, 2)}</pre>
		</div>
	);
};

export interface CarouselProps extends Settings {
	component?: React.ComponentType<any>;
	recommendationQuery: RecommendationQuery;
}

export default function Carousel({
	component: Component = DefaultCarouselComponent,
	recommendationQuery,
	...sliderProps
}: CarouselProps) {
	const { data, error, getRecs, isFailure, isLoading, isSuccess } = useRecommendations(null);

	React.useEffect(() => {
		getRecs(recommendationQuery, (response) => response.result);
	}, []);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isFailure) {
		return <span>ERROR</span>;
	}

	return (
		<Slider {...sliderProps}>
			{Array.isArray(data) && data.map((each, idx) => <Component key={idx} {...each} />)}
		</Slider>
	);
}
