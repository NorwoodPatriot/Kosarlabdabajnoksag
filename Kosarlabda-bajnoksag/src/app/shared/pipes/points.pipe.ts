import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'points'
})
export class PointsPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value} pts`;
  }

}