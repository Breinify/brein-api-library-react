import React from 'react';

import type { RecommendationQuery } from '../../types';

import { useRecommendations } from '../../hooks';

import Slider from 'react-slick';
import type { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './carousel-styles.scss';

const DefaultCarouselComponent = ({ title, image, description }: any) => {
	return (
		<div className='breinify-recommendation'>
			<div className='br-rec-content'>
				<div className='br-product-image-overlay' />
				<img className='br-product-image' src={image} />
				<div className='br-product-name'>{title}</div>
			</div>
			{!!description && (
				<div className='br-rec-description'>
					<span>{description}</span>
				</div>
			)}
			<div className='br-rec-footer'>
				<div className='br-rec-button'>View Product</div>
			</div>
		</div>
	);
};

function defaultGetComponentProps(data: Record<string, any> = {}) {
	const { additionalData } = data;
	const title = additionalData['product::productName'];
	const image = additionalData['product::productMediumImageUrl'] || additionalData['product::productImageUrl']; // prioritzes medium image URL
	const url = additionalData['product::productUrl'];
	const description = additionalData['product::productDescription'];

	return {
		title,
		image,
		url,
		description,
	};
}

export interface CarouselProps extends Settings {
	component?: React.ComponentType<any>;
	getComponentProps?(dataResult: any): Record<string, any>;
	recommendationQuery: RecommendationQuery;
	onError?(reason: any): void;
	containerClassName?: string;
}

export default function Carousel({
	component: Component = DefaultCarouselComponent,
	getComponentProps = defaultGetComponentProps,
	recommendationQuery,
	onError,
	containerClassName,
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
		<div className={containerClassName}>
			<Slider {...sliderProps}>
				{Array.isArray(data) && data.map((each, idx) => <Component {...getComponentProps(each)} key={idx} />)}
			</Slider>
		</div>
	);
}
