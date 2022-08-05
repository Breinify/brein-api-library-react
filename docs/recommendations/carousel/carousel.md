# Carousel Props

* [component](#component)
* [loaderComponent](#loadercomponent)
* [getComponentProps](#getcomponentprops)

### component
The props for your component comes from [getComponentProps](#getcomponentprops). This component renders each item in the carousel.

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
A function to filter props passed down to the `component`. `getComponentProps` receives all the props and filters it based on user needs.
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
