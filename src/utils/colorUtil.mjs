// convert 'rgb' value to a value CSS can parse
export const rgbToInt = value => Math.ceil(value * 255);

// convert parseable 'rgb' value to an equivalent 'hexadecimal' value
const intToHex = int => {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

// convert 'rgb' value to 'hex' value
export const rgbToHex = (r, g, b) => {
  const red = intToHex(r);
  const green = intToHex(g);
  const blue = intToHex(b);
  return `#${red}${green}${blue}`;
};
