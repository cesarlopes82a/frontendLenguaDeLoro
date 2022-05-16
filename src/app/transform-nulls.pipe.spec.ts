import { TransformNullsPipe } from './transform-nulls.pipe';

describe('TransformNullsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformNullsPipe();
    expect(pipe).toBeTruthy();
  });
});
