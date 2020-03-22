import axios from 'axios';
import fs from 'fs';
import config from './../config.mjs';
import json from './../server/json/db.json'; // Access JSON directly if JSON server fails
import setApiUrl from './utils/setApiUrl.mjs';

const {
  apiEnabled,
  apiMode,
  figmaClientId,
  tokenFigma
} = config;

// --------------- data handling - begin --------------- //

// Path to file we'll be exporting the token data to
const exportPath = 'export/designTokens.json';
// The name of the CANVAS containing the design tokens
const canvasTokensName = 'Tokens';
// The name of the COMPONENT / INSTANCE containing the color definitions
const palletteColorsName = 'Pallette Colors';
// The name of the COMPONENT / INSTANCE containing the color swatch
const palletteColorSwatchName = 'Color';
// The name of the COMPONENT / INSTANCE containing the color swatch's name
const colorName = 'ColorName';
// The name of the COMPONENT / INSTANCE containing the color swatch's color value
const colorPreview = 'ColorPreview';

// output prettyfied JSON
const prettyJSON = value => JSON.stringify(value, null, 2);

// convert 'rgb' value to a value CSS can parse
const rgbToInt = value => Math.ceil(value * 255);

// convert parseable 'rgb' value to an equivalent 'hexadecimal' value
const intToHex = int => {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
}

// convert 'rgb' value to 'hex' value
const rgbToHex = (r, g, b) => {
  const red = intToHex(r);
  const green = intToHex(g);
  const blue = intToHex(b);
  return `#${red}${green}${blue}`;
}

// handle the data and export it to the file defined by 'exportPath'
const handleData = (response, mode) => {
  // count ellapsed time -> start
  const start = Date.now();
  // parse response if its format is JSON
  let data = null;
  if (mode === '[handleData] server [figma]') {
    // 'response.data' because 'axios' prepends the response with 'data'
    data = response;
  } else {
    data = JSON.parse(response);
  }
  // TODO: nest these variables so that we fail early by validating them
  // retrieve Figma's 'document' children, so we can fail early
  const docChildren = data.document.children;
  // retrieve canvas containing tokens
  const tokens = docChildren.filter(child => child.name === canvasTokensName && child.type === 'CANVAS');
  // retrieve component / instance containing the pallette for colors
  const palletteColors = tokens[0].children.filter(child => child.name === palletteColorsName && (child.type === 'COMPONENT' || child.type === 'INSTANCE'));
  // retrieve color swatches
  const swatchesColors = palletteColors[0].children.filter(child => child.name === palletteColorSwatchName && (child.type === 'COMPONENT' || child.type === 'INSTANCE'));
  // retrieve color variable name
  const getColorName = color => color.children[0].name === colorName && color.children[0].type === 'TEXT' && color.children[0].characters !== '' ? color.children[0].characters : '';
  // retrieve color 'rgba' value
  const getColorRgba = color => {
    if (color.children[1].name === colorPreview && color.children[1].type === 'ELLIPSE') {
      const colorObj = color.children[1].fills[0].color;
      const r = rgbToInt(colorObj.r);
      const g = rgbToInt(colorObj.g);
      const b = rgbToInt(colorObj.b);
      const a = rgbToInt(colorObj.a);
      if (r !== '' && g !== '' && b !== '' && a !== '') {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }
    }
    return null;
  };
  // retrieve color 'hex' value
  const getColorHex = color => {
    if (color.children[1].name === colorPreview && color.children[1].type === 'ELLIPSE') {
      const colorObj = color.children[1].fills[0].color;
      const r = rgbToInt(colorObj.r);
      const g = rgbToInt(colorObj.g);
      const b = rgbToInt(colorObj.b);
      if (r !== '' && g !== '' && b !== '') {
        return rgbToHex(r, g, b);
      }
    }
    return null;
  };
  // extract values and generate color variable definitions
  const swatchesColorsExtracted = swatchesColors.map(c => ({
    colorName: getColorName(c),
    colorRgba: getColorRgba(c),
    colorHex: getColorHex(c),
  }));
  // write to file
  fs.writeFile(
    exportPath,
    prettyJSON(swatchesColorsExtracted),
    'utf8',
    (err) => {
      if (err) {
        console.log(`[handleData]: Export error! ${err}`);
      };
      return null;
    }
  );
  // count ellapsed time -> end
  const end = Date.now();
  const time = ((end - start) / 1000).toFixed(2);
  console.log('✨ Done in:', `${time}s`);
};

// --------------- data handling - end ----------------- //

// --------------- data fetching - begin --------------- //

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

// THE FINAL STEP: fetch data and ouput design tokens
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
        response = json;
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
    response = json;
    handleData(response, '[handleData] direct - api disabled');
  } catch (error) {
    console.log(error);
  }
}

// --------------- data fetching - end ----------------- //
