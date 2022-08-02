# Recommendations
Retrieves a list of recommended products for the user supplied in the user object of the body. To use the recommendations components, we’ve assumed that you’ve set up [BreinifySetup](/README.md#configuring-the-library).
We provide a toolkit for you to interact with the Breinify API.
* [Hooks](#hooks)
  * [useRecommendations](#userecommendations)
  * [Example](#example)
* [Utilities](#utilities)
  * [getRecommendations](#getrecommendations)
  * [Example](#example-1)

## Hooks
Provides a standard API wrapper that calls the `getRecommendation` fetch method.

### useRecommendations
```tsx
const { getRecs, data, isInit, isLoading, isSuccess, isFailure, error } =
        useRecommendations(defaultDataState);
```
> During the initial render, the returned data is the same as the value passed as the first argument (defaultDataState).

| Name          | Description                                                                   | Type                                                                                                | Default |
|---------------|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|---------|
| **getRecs**   | Call to get recommendations                                                   | `({user, unixTimestamp, signature, recommendation, recommendations}: RecommendationQuery) => void ` |         |
| **data**      | Response from `getRecs`                                                       | `any`                                                                                               | `null`  |
| **isInit**    | If true, the hook just initialized                                            | `boolean`                                                                                           | `true`  |
| **isLoading** | If true, the query is still in flight and results have not yet been returned. | `boolean`                                                                                           | `false` |
| **isSuccess** | If true, the query has succeeded and the response is passed to `data`         | `boolean`                                                                                           | `false` |
| **isFailure** | If true, the query has failed and the response is passed to `error`           | `boolean`                                                                                           | `false` |
| **error**     | Response on why `getRecs` failed                                              | `string`, `object`                                                                                  | `''`    |


#### Example
```tsx
import { useRecommendations } from "brein-api-library-react";

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

| Name                                     | Description                                                                                                        | type                                                                                                 |
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| **user**                                 | Information about the user                                                                                         | [user](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation)              |
| **unixTimestamp**                        | The number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970. | `number`                                                                                             |
| **signature**                            | Signature to authenticate a request, is only available if the the secret for the Breinify API key is configured.   | `string`                                                                                             |
| **recommendation**<br/>***required*****  | Parameters set for making the recommendations.                                                                     | [recommendation](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation)    |
| **recommendations**<br/>***required***** | A list of `recommendation`                                                                                         | [[recommendations]](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation) |
> #### ** Either recommendation OR recommendations is required!
> Please check out the [Breinify Docs](https://docs.breinify.com/?javascript--node#requesting-a-product-recommendation) for more information about the props

#### Example
```tsx
getRecommendations({
    user,
    unixTimestamp,
    signature,
    recommendation,
    recommendations,
})
    .then((response) => {})
    .catch((error) => {});
```