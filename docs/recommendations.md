# Recommendations
Retrieves a list of recommended products for the user supplied in the user object of the body. To use the recommendations components, we’ve assumed that you’ve set up [BreinifySetup](/README.md#configuring-the-library).

## Hooks
### useRecommendations
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

## Calls
### getRecommendations
If you don’t want to use the hook (`useRecommendations`) we provided, we also exposed `getRecommendations`  to help call our API.

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