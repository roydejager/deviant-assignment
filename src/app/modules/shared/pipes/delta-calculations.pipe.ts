import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPercentage'
})
export class CalculateTotalPercentagePipe implements PipeTransform {

  transform(a: number, b: number): any {
    const percentage = a / b * 100;
    return Number(percentage.toFixed(0));
  }
}
