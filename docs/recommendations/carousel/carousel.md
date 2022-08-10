# Carousel Props

* [component](#component)
* [loaderComponent](#loadercomponent)
* [getComponentProps](#getcomponentprops)

### component
A custom component that will be used to render a single item in the carousel. The props for this component are determined by [getComponentProps](#getcomponentprops).

#### Example
```tsx
function CustomComponent({ title, image }: any) {
    return (
        <div className="breinify-recommendation">
            <div className="br-rec-content">
                <div className="br-product-name">{title}</div>
                <img className="br-product-image" src={image} />
            </div>
        </div>
    );
}

export const CarouselTest = () => {
    return <Carousel component={CustomComponent} />;
};
```
### loaderComponent
Customize the loader component

#### Example
```tsx
function CustomLoader({ title, image }: any) {
    return <div>Loading</div>;
}

export const CarouselTest = () => {
    return <Carousel loaderComponent={CustomLoader} />;
};
```

### getComponentProps
A prop getter function to get the props that will be passed to `component`. `getComponentProps` is called with the one parameter: the recommendation result
> Note: If you are using our default [component](#component), `getComponentProps` should return {`title`,`image`,`description`} to utilize our styles.

```tsx
/**
 * data:
 * {
 *     "weight": 0.5,
 *     "additionalData": {
 *         "product::productImageUrl": "https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
 *         "product::productDescription": "This is a cool item",
 *         "product::productName": "Cool Item",
 *     },
 *     "dataIdExternal": "1"
 * },
 */

function getComponentProps({ dataIdExternal, additionalData }: any) {
    const title = additionalData['product::productName'];
    const image = additionalData['product::productImageUrl'];
    return {
        title,
        description: dataIdExternal,
        image,
    };
}

export const CarouselTest = () => {
    return <Carousel getComponentProps={getComponentProps} />;
};
```
