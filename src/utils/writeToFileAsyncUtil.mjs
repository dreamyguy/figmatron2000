import fs from 'fs';
import config from './../../config.mjs';

const {
  exportPath
} = config;

const writeToFileAsync = ({ exportPathCustom, extension, output }) => {
  const fullExportPath = `${exportPathCustom || exportPath}.${extension}`;
  fs.writeFile(
    fullExportPath,
    output,
    'utf8',
    (err) => {
      if (err) {
        console.log(`[handleData]: Export '${extension}' error! ${err}`);
      };
      console.log(`🤖 Successfully exported '${fullExportPath}'`);
      return null;
    }
  );
}

export default writeToFileAsync;
