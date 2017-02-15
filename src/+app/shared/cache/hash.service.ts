import { Injectable } from '@angular/core';

@Injectable()
export class HashService {

  hashCodeString(str: string): string {
    let hash = 0;
    if (str.length === 0) {
      return hash + '';
    }
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash + '';
  }

}
