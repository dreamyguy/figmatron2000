import axios from 'axios';
import config from './../config.mjs';
import json from './../server/json/db.json'; // Access JSON directly if JSON server fails
import setApiUrl from './utils/setApiUrl.mjs';

const {
  apiEnabled,
  apiMode,
  figmaClientId,
  tokenFigma
} = config;

// request objects
const requestFigma = {
  method: 'get',
  url: `https://api.figma.com/v1/files/${figmaClientId}`,
  headers: {
    'X-Figma-Token': tokenFigma,
  },
};
const requestJsonServer = {
  method: 'get',
  url: `${setApiUrl().envApiUrl}/figma`,
};

const api = apiMode === 'figma' ? requestFigma : requestJsonServer;

// the response will be handled and output
// to files or directly to application from here
const handleData = (response, mode) => {
  console.log('mode', mode);
  console.log('response', response);
};

let response = null;

if (apiEnabled) {
  // 'setApiUrl' dynamically changes the root's request
  // according to environment
  axios(api)
    .then(res => {
      response = res.data;
      handleData(response, `[handleData] server [${apiMode}]`);
    })
    .catch(err => {
      try {
        // Fallback to getting the file directly if JSON server fails
        response = json.figma;
        handleData(response, '[handleData] direct - api fallback');
      } catch (error) {
        // Both JSON server and fallback 'direct reading'
        // of the JSON file failed, print the error
        console.log(err.message);
      }
    });
} else {
  // If API is disabled fallback to getting the file directly if JSON server fails
  try {
    response = json.figma;
    handleData(response, '[handleData] direct - api disabled');
  } catch (error) {
    console.log(error);
  }
}
