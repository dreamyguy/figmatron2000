import dotenv from 'dotenv';

dotenv.config();

const hostname =
  typeof window === 'object' && window.location.hostname !== '' ?
  window.location.hostname :
  'localhost';

// env vars
const inDevelopment = process.env.NODE_ENV === 'development';
const currentEnv = process.env.NODE_ENV;

// port vars
const portServerJson = process.env.PORT_SERVER_JSON;
const portServerGraphql = process.env.PORT_SERVER_GRAPHQL;
const portServerSanity = process.env.PORT_SERVER_SANITY;
const portAppReact = process.env.PORT_APP_REACT;

// token vars
// See: https://www.figma.com/developers/docs
const tokenFigma = process.env.TOKEN_FIGMA;
const tokenSanity = process.env.TOKEN_SANITY;

// figma vars
const figmaClientId = process.env.FIGMA_CLIENT_ID;

// sanity vars
const sanityProjectId = process.env.SANITY_PROJECT_ID;
const sanityDataset = process.env.SANITY_PROJECT_ID;

// api & server vars
const apiMode = 'figma'; // 'figma' || 'json'
const serverMode = 'json'; // json | graphql | sanity
const urlBaseDev = `http://${hostname}`;
const urlBaseSanity = `https://${sanityProjectId}.api.sanity.io/v1/graphql/${sanityDataset}/default`;

// env address vars
const envProd = 'yolo.io';
const envQa = 'qa.yolo.io';
const envTest = 'test.yolo.io';

const config = {
  apiEnabled: true,
  // Access Figma directly or a local mock through 'JSON Server'
  apiMode,
  apiUrl: {
    prod: `https://${envProd}/api/v1`,
    qa: `https://${envQa}/api/v1`,
    test: `https://${envTest}/api/v1`,
  },
  currentEnv,
  figmaClientId,
  hostnames: {
    prod: envProd,
    qa: envQa,
    test: envTest,
  },
  inDevelopment,
  portAppReact,
  portServerGraphql,
  portServerJson,
  portServerSanity,
  serverMode,
  tokenFigma,
  tokenSanity,
  urlBaseDev,
  urlBaseSanity
};

export default config;
