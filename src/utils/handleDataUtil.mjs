import config from './../../config.mjs';
import {
  rgbToInt,
  rgbToHex,
} from './colorUtil.mjs';
import writeToFileAsync from './writeToFileAsyncUtil.mjs';

const {
  exportPathCustom: {
    json: exportPathJson = null,
    scss: exportPathScss = null,
    less: exportPathLess = null,
  } = null,
} = config;

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

// handle the data and export it to the file defined by 'exportPath'
const handleData = (response, mode) => {
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
  // extract values and generate color variable definitions to JSON
  const swatchesColorsExtractedJson = swatchesColors.map(c => ({
    colorName: getColorName(c),
    colorRgba: getColorRgba(c),
    colorHex: getColorHex(c),
  }));
  // extract values and generate color variable definitions to SCSS
  const swatchesColorsExtractedScss = swatchesColors.map(c => `$${getColorName(c)}: ${getColorHex(c)};`);
  // extract values and generate color variable definitions to LESS
  const swatchesColorsExtractedLess = swatchesColors.map(c => `@${getColorName(c)}: ${getColorHex(c)};`);
  // write to JSON
  writeToFileAsync({
    exportPathCustom: exportPathJson || null,
    extension: 'json',
    output: prettyJSON(swatchesColorsExtractedJson),
  });
  // write to SCSS
  writeToFileAsync({
    exportPathCustom: exportPathScss || null,
    extension: 'scss',
    output: swatchesColorsExtractedScss.join('\n'),
  });
  // write to LESS
  writeToFileAsync({
    exportPathCustom: exportPathLess || null,
    extension: 'less',
    output: swatchesColorsExtractedLess.join('\n'),
  });
};

export default handleData;
