import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IProduct>, ...field: string[]): Array<IProduct> {
    if (!field) {
      return value;
    }
    if (!value) {
      return [];
    }
    return value.filter(prod => prod.description.toLowerCase().includes(field.toString()))
  }

}
