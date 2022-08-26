# Recommendations
Retrieves a list of recommended products for the user supplied in the user object of the body. To use the recommendations components, we’ve assumed that you’ve set up [BreinifySetup](/README.md#configuring-the-library).
We provide a toolkit for you to interact with the Breinify API.
* [Hooks](#hooks)
  * [useRecommendations](#userecommendations)
  * [Example](#example)
* [Utilities](#utilities)
  * [getRecommendations](#getrecommendations)
  * [Example](#example-1)
  * [Response](#success-response)
    * [recommendation](#recommendation)
    * [recommendations](#recommendations-1)

## Hooks
Provides a standard API wrapper that calls the `getRecommendation` fetch method.

### useRecommendations
```tsx
const { getRecs, data, isInit, isLoading, isSuccess, isFailure, error } =
        useRecommendations(defaultDataState);
```
> During the initial render, the returned data is the same as the value passed as the first argument (defaultDataState).

| Name          | Description                                                                   | Type                                                                                                          | Default |
|---------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------|
| **getRecs**   | Call to get recommendations                                                   | `({user, unixTimestamp, signature, recommendation, recommendations}: RecommendationQuery, selector) => void ` |         |
| **data**      | Response from `getRecs`                                                       | [recommendation](#recommendation), [recommendations](#recommendations-1)                                      | `null`  |
| **isInit**    | If true, the hook just initialized                                            | `boolean`                                                                                                     | `true`  |
| **isLoading** | If true, the query is still in flight and results have not yet been returned. | `boolean`                                                                                                     | `false` |
| **isSuccess** | If true, the query has succeeded and the response is passed to `data`         | `boolean`                                                                                                     | `false` |
| **isFailure** | If true, the query has failed and the response is passed to `error`           | `boolean`                                                                                                     | `false` |
| **error**     | Response on why `getRecs` failed                                              | `string`, `object`                                                                                            | `''`    |

#### getRecs
```tsx
getRecs({user, unixTimestamp, signature, recommendation, recommendations}: RecommendationQuery, selector)
```

##### RecommendationQuery
| Name                                     | Description                                                                                                      | Type                                                                                                       |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **user**                                 | Information about the user                                                                                       | [user](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation)                    |
| **unixTimestamp**                        | Recommendations based on this time.                                                                              | number                                                                                                     |
| **signature**                            | Signature to authenticate a request, is only available if the the secret for the Breinify API key is configured. | string                                                                                                     |
| **recommendation**<br/>***required*****  | Parameters set for making the recommendations.                                                                   | [recommendation](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation)          |
| **recommendations**<br/>***required***** | A list of `recommendation`                                                                                       | Array of [recommendation](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation) |
> #### ** Either recommendation OR recommendations is required!
> Please check out the [Breinify Docs](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation) for more information about the props

##### Selector
| Name         | Description                                                                                      | Type       |
|--------------|--------------------------------------------------------------------------------------------------|------------|
| **selector** | A function that allows the user to parse the response and use that parsed response in the `data` | `function` |

#### Example
```tsx
import { useRecommendations } from "breinify-react";

export function TestContainer() {
    const { getRecs, data, isInit, isLoading, isSuccess, isFailure, error } =
        useRecommendations();

    function onButton() {
        getRecs({ recommendation: {} });
    }

    useEffect(() => {
        getRecs({ recommendation: { numRecommendations: 10 } });
    }, []);

    return (
        <div>
            {isInit && <>INIT</>}
            {isLoading && <>LOADING</>}
            {isSuccess && <>{JSON.stringify(data, null, 2)}</>}
            {isFailure && <>{JSON.stringify(error, null, 2)}</>}
            <button onClick={onButton}>Click Here</button>
        </div>
    );
}
```

## Utilities
### getRecommendations
We've also exposed the lower level utility that aids in calling our recommendation API.

#### Example
```tsx
getRecommendations({
    user,
    unixTimestamp,
    signature,
    recommendation,
    recommendations,
}: RecommendationQuery)
    .then((response) => {})
    .catch((error) => {});
```
> [RecommendationQuery](#getrecs)

### Success Response

#### recommendation
```json
{
  "additionalData": {},
  "result": [{
    "dataIdExternal": "123",
    "recommendationWeight": 0.9,
    "additionalData": {
      "name": "some name",
      "clientSuppliedField": "some meta data"
    }
  },
    {
      "dataIdExternal": "234",
      "recommendationWeight": 0.87,
      "additionalData": {
        "name": "another name",
        "clientSuppliedField": "some meta data"
      }
    },
    {
      "dataIdExternal": "345",
      "recommendationWeight": 0.86,
      "additionalData": {
        "name": "third item name",
        "clientSuppliedField": "some meta data"
      }
    }
  ],
  "message": "Successful execution with nothing to report.",
  "statusCode": 200
}
```

#### recommendations
```json
{
  "results": [
    recommendation
  ],
  "message": "Successful execution with nothing to report.",
  "statusCode": 200
}
```
> [recommendation](#recommendation) in this case is the response above

#### Result response
| Name                 | Description                              | Type     |
|----------------------|------------------------------------------|----------|
| dataIdExternal       | The client’s id for the recommended item | `string` |
| recommendationWeight | The recommender’s weight for the item    | `float`  |
| additionalData       | Additional data supplied by the client   | `object` |

## Carousel
Our Carousel extends [react-slick](https://react-slick.neostack.com/docs/api).

| Name                                                                                  | Description                                                                                     | Type                  | Props            |
|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|-----------------------|------------------|
| **recommendationQuery**                                                               | Query to call the [Breinify API](https://docs.breinify.com/#recommendations)                    | `object`              |                  |
| **containerClassName**                                                                | Container className to overwrite the default className (`breinify-carousel`)                    | `string`              |                  |
| **containerStyles**                                                                   | Styles to pass into the carousel container                                                      | `React.CSSProperties` |                  |
| **onError**                                                                           | A callback that is called whenever `getRecs` status turns to `FAILURE`                          | `function`            | (`error`: `any`) |
| **buttonLabel**                                                                       | Change the label name of the carousel item's button                                             | `string`              |                  |
| **onButtonClick**                                                                     | A callback when an item in the carousel is clicked. It provides the entire recommendation entry | `function`            | (`props`: `any`) |
| **[component](/docs/recommendations/carousel/carousel.md#component)**                 |                                                                                                 |                       |                  |
| **[loaderComponent](/docs/recommendations/carousel/carousel.md#loadercomponent)**     |                                                                                                 |                       |                  |
| **[getComponentProps](/docs/recommendations/carousel/carousel.md#getcomponentprops)** |                                                                                                 |                       |                  |
| **...sliderProps**                                                                    | ([react-slick](https://react-slick.neostack.com/docs/api)) props                                |                       |                  |

#### Example
```tsx
import React from "react";
import { Carousel } from "breinify-react";

export const CarouselTest = () => {
  return (
          <Carousel
                  dots
                  arrows
                  infinite
                  slidesToShow={3}
                  slidesToScroll={2}
                  containerStyles={{ padding: "20%", height: "350px" }}
                  onButtonClick={(props) => console.log("props: ", props)}
                  onError={(error) => console.log("error: ", error)}
                  responsive={[
                    {
                      breakpoint: 1440,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                      },
                    },
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                      },
                    },
                    {
                      breakpoint: 850,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                      },
                    },
                    {
                      breakpoint: 500,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 425,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                      },
                    },
                  ]}
                  recommendationQuery={{
                    recommendation: {
                      numRecommendations: 10,
                    },
                  }}
          />
  );
};

```