import config from './config.mjs';

describe('Test config', () => {
  describe('hostnames', () => {
    it('prod', () => {
      expect(config.hostnames.prod).toEqual('yolo.io');
    });
    it('qa', () => {
      expect(config.hostnames.qa).toEqual('qa.yolo.io');
    });
    it('test', () => {
      expect(config.hostnames.test).toEqual('test.yolo.io');
    });
  });
  describe('apiUrl', () => {
    it('prod', () => {
      expect(config.apiUrl.prod).toEqual('https://yolo.io/api/v1');
    });
    it('qa', () => {
      expect(config.apiUrl.qa).toEqual('https://qa.yolo.io/api/v1');
    });
    it('test', () => {
      expect(config.apiUrl.test).toEqual('https://test.yolo.io/api/v1');
    });
  });
});
