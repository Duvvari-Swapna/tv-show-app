import { CustomMatModule } from './custom-mat.module';

describe('CustomMatModule', () => {
  let customMatModule: CustomMatModule;

  beforeEach(() => {
    customMatModule = new CustomMatModule();
  });

  it('should create an instance', () => {
    expect(customMatModule).toBeTruthy();
  });
});
