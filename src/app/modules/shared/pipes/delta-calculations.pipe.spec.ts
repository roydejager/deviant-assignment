import { CalculateTotalPercentagePipe } from './delta-calculations.pipe';

describe('DeltaCalculationsPipe', () => {
  it('create an instance', () => {
    const pipe = new CalculateTotalPercentagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return ', () => {
    expect(new CalculateTotalPercentagePipe().transform(80, 100)).toEqual(80);
  });
});
