import config from './../../config.mjs';

const {
  portServerJson,
  portServerGraphql,
  portServerSanity,
  serverMode
} = config;

const serverPort = mode => {
  let port = '';
  const theMode = mode || serverMode;
  switch (theMode) {
    case 'sanity':
      port = portServerSanity;
      break;
    case 'graphql':
      port = `${portServerGraphql}/graphql`;
      break;
    case 'json':
      port = portServerJson;
      break;
    default:
      // Syntax sugar, we default to 'json'
      port = portServerJson;
      break;
  }
  return port;
};

export default serverPort;
