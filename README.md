# ReceiptScanner

## Installation
```
cd GoogleVision
npm install
npm start
```


## Google Cloud Vision API Key
To obtain your Google Cloud Vision API key, 
please refer to the official documentation at [Google Cloud Vision Setup](https://cloud.google.com/vision/docs/setup).

After obtaining your API key, create a `src/config.js` file in the root of your project and add your API key as follows:

```javascript
const API_KEY = 'Your API Key';

export { API_KEY };
```


## Demo
![Demo.gif](Demo.gif)

## current features
- [x] Import images
- [x] Detect text in images
- [ ] Extract the price and the name of the product
