import { CalculateTotalPercentagePipe } from './delta-calculations.pipe';

describe('DeltaCalculationsPipe', () => {
  it('create an instance', () => {
    const pipe = new CalculateTotalPercentagePipe();
    expect(pipe).toBeTruthy();
  });
});
