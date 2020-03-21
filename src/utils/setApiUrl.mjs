import config from '../../config.mjs';
import serverPort from './serverPort.mjs';

const {
  apiUrl,
  currentEnv,
  hostnames,
  inDevelopment,
  serverMode,
  urlBaseDev
} = config;

const setApiUrl = hostname => {
  let envApiUrl = apiUrl.prod;
  let environment = 'development';
  try {
    switch (hostname) {
      case hostnames.test:
        console.warn('Setting environment to Test');
        envApiUrl = apiUrl.test;
        break;
      case hostnames.qa:
        console.warn('Setting environment to QA');
        environment = 'production';
        envApiUrl = apiUrl.qa;
        break;
      case hostnames.prod:
        environment = 'production';
        envApiUrl = apiUrl.prod;
        break;
      case hostnames.dev:
        // Reduce noise while testing
        if (currentEnv !== 'test') {
          console.log('Setting environment to local');
        }
        envApiUrl = !inDevelopment ? apiUrl.test : `${urlBaseDev}:${serverPort(serverMode)}`;
        break;
      default:
        // Reduce noise while testing
        if (currentEnv !== 'test') {
          console.log('Setting environment to local');
        }
        envApiUrl = !inDevelopment ? apiUrl.test : `${urlBaseDev}:${serverPort(serverMode)}`;
        break;
    }
    return {
      envApiUrl,
      environment,
    };
  } catch (err) {
    console.error(err);
  }
  return null;
};

export default setApiUrl;
