import { Injectable, EventEmitter } from '@angular/core';

import { Meta } from '../meta/meta';


@Injectable()
export class MetaSetterService {

  public eventEmitter: EventEmitter<Meta>;
  private meta: Meta;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.meta = new Meta();
  }

  public set(meta: Meta): void {
    this.meta = meta;
    this.eventEmitter.emit(this.meta);
  }

}
