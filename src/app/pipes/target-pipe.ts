import { Pipe, PipeTransform } from '@angular/core';
import { Target } from '../models/target.interface';

@Pipe({
  name: 'targetPipe'
})
export class TargetPipe implements PipeTransform {

  // the purpose of this class is to take any game Object and transform it into a Target

  transform(value: any, args?: any): Target {
    const result = new Target(value.type, value);
    if (value.hasOwnProperty('id')) {
      result.targetId = value.id;
    }

    return result;
  }

}
