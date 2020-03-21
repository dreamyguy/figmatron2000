import config from '../../config.mjs';
import serverPort from './serverPort.mjs';

const {
  serverMode,
  urlBaseDev
} = config;

const requestRoot = mode => {
  let url = '';
  const theMode = mode || serverMode;
  switch (theMode) {
    case 'sanity':
      url = `${urlBaseDev}:${serverPort('sanity')}`;
      break;
    case 'graphql':
      url = `${urlBaseDev}:${serverPort('graphql')}`;
      break;
    case 'json':
      url = `${urlBaseDev}:${serverPort('json')}`;
      break;
    default:
      // Syntax sugar, we default to 'json'
      url = `${urlBaseDev}:${serverPort('json')}`;
      break;
  }
  return url;
};

export default requestRoot;
