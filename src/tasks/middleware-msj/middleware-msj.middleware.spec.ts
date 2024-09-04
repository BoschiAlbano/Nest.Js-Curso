import { MiddlewareMsjMiddleware } from './middleware-msj.middleware';

describe('MiddlewareMsjMiddleware', () => {
  it('should be defined', () => {
    expect(new MiddlewareMsjMiddleware()).toBeDefined();
  });
});
