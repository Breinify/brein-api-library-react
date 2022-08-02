# Breinify’s React API Library

<!-- TOC -->
* [Overview](#overview)
* [Getting Started](#getting-started)
  * [Retrieving an API-Key](#retrieving-an-api-key)
  * [Installing](#installing)
  * [Configuring the Library](#configuring-the-library)
* [API](#api)
* [Further Links](#further-links)
<!-- TOC -->

## Overview
Breinify’s React API library provides hooks, components, and type definitions to call Breinify’s API.

## Getting Started
### Retrieving an API-Key
You need a valid API-key, which you can get for free at  [https://www.breinify.ai](https://www.breinify.ai/) . In the examples, we assume you have the following API key:
#### 938D-3120-64DD-413F-BB55-6573-90CE-473A
It is recommended to use signed messages when utilizing the react library. A signed messages ensures, that the request is authorized. To activate signed message ensure that `Verification Signature` is enabled for your key (see  [Breinify’s API Docs](https://docs.breinify.com/#request-an-api-key)  for further information). In this documentation we assume that the following secret is attached to the API key and used to sign a message.
#### utakxp7sm6weo5gvk7cytw==

### Installing
The library is available on  [npm](https://www.npmjs.com/package/brein-react-api-library-react)  and can be added using:
```bash
npm i brein-react-api-library-react --save
```

### Configuring the Library
Whenever the library is used, it needs to be configured, i.e., the configuration defines which API key and which secret (if signed messages are enabled, i.e., `Verification Signature` is checked) to use. Please place `BreinifySetup` on the top most section of your application.
```tsx
import { BreinifySetup } from 'brein-api-library-react';

const apiKey = '938D-3120-64DD-413F-BB55-6573-90CE-473A';
const secret = 'utakxp7sm6weo5gvk7cytw==';

BreinifySetup({ apiKey, secret });
```
> Note: API Key and Secret should not be shown publicly

## API
* [Recommendations](/docs/recommendations.md)


## Further Links
To understand all the capabilities of Breinify’s API, you can find further information here:
* [API Docs](https://docs.breinify.com/)
* [Breinify’s Website](https://home.breinify.ai/)