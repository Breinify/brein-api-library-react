import React from 'react';
import Slider from 'react-slick';
import type { Settings } from 'react-slick';

// TYPES
import type { RecommendationQuery } from '../../types';

// HOOKS
import { useRecommendations } from '../../hooks';

// CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel-styles.scss';

const DefaultCarouselComponent = ({ onButtonClick, ...props }: any) => {
	const { title, image, description } = props;

	function onClick() {
		if (onButtonClick instanceof Function) onButtonClick(props);
	}

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
			<div className='br-rec-footer' onClick={onClick}>
				<div className='br-rec-button'>View Product</div>
			</div>
		</div>
	);
};

const DefaultLoaderComponent = () => {
	return (
		<div className='lds-ring'>
			<div />
			<div />
			<div />
			<div />
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
	loaderComponent?: React.ComponentType<any>;
	getComponentProps?(dataResult: any): Record<string, any>;
	recommendationQuery: RecommendationQuery;
	containerClassName?: string;
	containerStyles?: React.CSSProperties;
	onError?(error: any): void;
	onButtonClick?(props: any): void;
}

export default function Carousel({
	component: Component = DefaultCarouselComponent,
	loaderComponent: LoaderComponent = DefaultLoaderComponent,
	getComponentProps = defaultGetComponentProps,
	recommendationQuery,
	containerClassName = 'breinify-carousel',
	containerStyles,
	onButtonClick,
	onError,
	...sliderProps
}: CarouselProps) {
	const { data, getRecs, isFailure, isLoading, isSuccess, error } = useRecommendations(null);

	React.useEffect(() => {
		getRecs(recommendationQuery, (response) => response.result);
	}, []);

	React.useEffect(() => {
		if (isFailure && onError instanceof Function) onError(error);
	}, [isFailure]);

	if (isFailure) {
		return null;
	}

	return (
		<div className={containerClassName} style={containerStyles}>
			{isLoading && <LoaderComponent />}
			{isSuccess && (
				<Slider {...sliderProps}>
					{Array.isArray(data) &&
						data.map((each, idx) => (
							<Component {...getComponentProps(each)} onButtonClick={onButtonClick} key={idx} />
						))}
				</Slider>
			)}
		</div>
	);
}
