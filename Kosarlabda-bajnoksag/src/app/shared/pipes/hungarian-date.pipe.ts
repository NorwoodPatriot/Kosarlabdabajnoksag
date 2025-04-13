// shared/pipes/hungarian-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hungarianDate',
  standalone: true
})
export class HungarianDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    // Ellenőrizzük, hogy érvényes dátum-e
    if (isNaN(date.getTime())) return value.toString();

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    };

    let formattedDate = date.toLocaleDateString('hu-HU', options);
    
    // A magyar locale a napnevet kisbetűvel adja vissza, mi nagybetűvel szeretnénk
    formattedDate = formattedDate.replace(/(\w+),/, (match, p1) => {
      return p1.charAt(0).toUpperCase() + p1.slice(1) + ',';
    });

    return formattedDate;
  }
}