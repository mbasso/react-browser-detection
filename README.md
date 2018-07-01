# React-browser-detection

[![npm](https://img.shields.io/npm/v/react-browser-detection.svg)](https://www.npmjs.com/package/react-browser-detection)
[![npm](https://img.shields.io/npm/l/react-browser-detection.svg)](https://github.com/mbasso/react-browser-detection/blob/master/LICENSE.md)

> React component to detect browser

Useful component to detect browser and act accordingly.

## Installation

Using [npm](https://www.npmjs.com/package/react-browser-detection):

```bash
npm install --save react-browser-detection
```

Supposing a CommonJS environment, you can simply use the component in this way:

```javascript
import React, { Component } from 'react';
import BrowserDetection from 'react-browser-detection';

const browserHandler = {
  chrome: () => <div>Chrome is fantastic!</div>,
  googlebot: () => <div>Hi GoogleBot!</div>,
  default: (browser) => <div>Hi {browser}!</div>,
};

export default class App extends Component {
  render() {
    return (
      <BrowserDetection>
        { browserHandler }
      </BrowserDetection>
    );
  }
}

```

## Documentation

### Props

Here is the list of props used by the component.

|Property   |Type   |Default   |Description   |
|-----------|-------|----------|--------------|
|once   |Bool    |true    |If ```true```, function contained in children prop will be call only once. If ```false```, it will be called on each render. Default ```true``` due to performance reasons   |
|children   |Object { browserName: function(browserName){ return node; }  }    |    |An object containing functions to handle different browsers. Properties would be called like browsers: ```chrome```, ```firefox```, ```ie```, ```edge```, ```safari```, ```opera```, ```blink```, ```googlebot``` and ```default```. If specified, the component will use the function under the property with the name of the browser, otherwise, it will use ```default```. Each function take the browser name as parameter and must return a node     |


### Determining the OS

At this time, only desktop and Android variations are being detected.  Others may be added as the need arises.
To determine if the browser is running on Android, prefix its name with `android-` in the object you pass as children.
You can also use `android` alone to fallback to a general case.

**Example**

```javascript
const browserHandler = {
  chrome: () => <div>Chrome is fantastic!</div>,
  googlebot: () => <div>Hi GoogleBot!</div>,
  android: () => <div>Whatever browser you have, it must be on Android!</div>
  'android-chrome': () => <div>Chrome is a good choice for Android!</div>
  default: (browser) => <div>Hi {browser}!</div>,
};

```

Handler determination goes from most to least specific.  It will first look for an `android-browserName` match and then `android` (assuming the OS is Android) then failing that it will look for `browserName` and finally will fallback to using `default`.  This allows you to custom tailor responses for each scenario, or to provide general cases.


## Author
**Matteo Basso**
- [github/mbasso](https://github.com/mbasso)
- [@Teo_Basso](https://twitter.com/Teo_Basso)

## Copyright and License
Copyright (c) 2016, Matteo Basso.

react-browser-detection source code is licensed under the [MIT License](https://github.com/mbasso/react-browser-detection/blob/master/LICENSE.md).
